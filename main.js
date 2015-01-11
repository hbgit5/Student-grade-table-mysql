// Step 1: Add data to students array
// Step 2: Add TR row to table
// Step 3: Everything else
var students = [
    //{fname: "Joe", lname: "Schmoe", grade: 55}
];

var high_index = 0;
var low_index = 0;

var fname_field, lname_field, grade_field, add_btn, del_btn;

function init() {
    // Assign references to various elements
    fname_field = $('#fname');
    lname_field = $('#lname');
    grade_field = $('#grade');
    add_btn = $('#btn-add-student');
    
    getStudent();

    // Create click event for add student button
    add_btn.click(addStudent);

    $('tbody').on('click', '.btn-del-student', removeStudent);
}

function getStudent() {
    //Ajax call to get .php to retrieve all student rows
    $.getJSON('get.php',
        function (student_rows) {
            for (var i = 0; i < student_rows.length; i++) {        
                var student = student_rows[i];
                
          // Add the physical rows to our table
            addRow(student);

            // Add student object into students array
            students.push(student);
            }
            updateAverage();
            compareGrades();
        
        }
    );
}
function removeStudent() {
    var row_index = $(this).parent().parent().index();
    var row_id = $(this).parent().parent().attr('data-id');
    $(this).parent().parent().remove();

    students.splice(row_index, 1);

    updateAverage();
    compareGrades();


    //Ajax call to delete student from db
    //Don't perform any DOM maniputations or calculations until our AJAX call is complete.
    $.post('delete.php', {
            id: row_id
        },
        function (response) {
            console.log(response);
        }
    );
}

function addStudent() {
    // Create object with the three values
    var student = {
        fname: fname_field.val(),
        lname: lname_field.val(),
        grade: parseFloat(grade_field.val())
    }

    $.post('insert.php', student,
        function (response) {
            var row_id = parseInt(response);

            //add the physical row to our table 
            student['id'] = row_id;



            // Add the physical rows to our table
            addRow(student);

            // Add student object into students array
            students.push(student);
            //console.log(students);



            // Clear out fields
            fname_field.val('');
            lname_field.val('');
            grade_field.val('');

            updateAverage();
            compareGrades();
        }
    )
};


function addRow(student) {
    var tr = $('<tr>').attr('data-id', student.id);
    var td_name = $('<td>').html(student.fname + ' ' + student.lname);
    var td_grade = $('<td>').html(student.grade);

    var button = $('<button>').addClass('btn btn-danger btn-del-student').html('X');
    var td_button = $('<td>').append(button);

    tr.append(td_name).append(td_grade).append(td_button);

    $('#grades-table tbody').append(tr);
}

function updateAverage() {
    $('#result').html(calculateAverage());
}

function calculateAverage() {
    var sum = 0;
    for (var i = 0; i < students.length; i++) {
        sum += parseFloat(students[i].grade);
    }

    var avg = sum / students.length;
    return avg;
}

function compareGrades() {
    var high = 0;
    var low = 9999;
    var rows = $('tbody tr');

  
    var highs =[], lows =[];
    rows.removeClass('bg-info').removeClass('bg-danger');
    
    for (var i = 0; i < students.length; i++) {
        students[i].grade =parseFloat(students[i].grade);
        
        if (students[i].grade < low) {
            low = students[i].grade;
            low_index = i;
            
            lows=[];
            lows.push(i);
        } else if(students[i].grade ===low) {
            lows.push(i);
        }

        if (students[i].grade > high) {
            high = students[i].grade;
            high_index = i;
            
            highs=[];
            highs.push (i);} else if(students[i].grade ===high) {
                highs.push(i);
                
            }
            
        }
    
for(var i=0; i< lows.length; i++) {
    $(rows[lows[i]]).addClass('bg-danger');
}
    for(var i=0; i< highs.length; i++) {
    $(rows[highs[i]]).addClass('bg-info');
    }
    
    /*$(rows[high_index]).addClass('bg-info');
    if (students.length > 1) {
        $(rows[low_index]).addClass('bg-danger');
    }*/
}

$(document).ready(init);