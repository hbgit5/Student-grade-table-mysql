<?php
require_once 'database.inc.php';

/*$insert_query = 'INSERT`grades`(`fname`,`lname`,`grade`)
                    VALUES
                    ("'.addslashes($_POST['fname']).'",
                    ("'.addslashes($_POST['lname']).'",
                    ('.addslashes($_POST['grade']).')';*/

if(isset($_POST['fname']) AND
    isset($_POST['lname']) AND
    isset($_POST['grade'])AND
    !empty($_POST['fname'])AND
    !empty($_POST['lname'])AND
    !empty($_POST['grade'])
  ) {
$student_insert_query='INSERT `students`(`fname`, `lname`) VALUES ("%s","%s")';
    $student_insert_query = sprintf(
        $student_insert_query,
        addslashes($_POST['fname']),
        addslashes($_POST['lname'])
    );
    mysqli_query($conn, $student_insert_query);
    $new_student_id = mysqli_insert_id($conn);
    
    
$insert_query = 'INSERT `gradeinput`(`grade`,`student_id`)
                    VALUES (%d, %d)';

$insert_query = sprintf(
    $insert_query,
    floatval($_POST['grade']),//replace first %d
    $new_student_id
);
    
$result= mysqli_query($conn, $insert_query);

if($result) {
    echo mysqli_insert_id($conn);
    } else {
    echo 'Failed to add';
}


} else {
    echo 'Yo..you missin somethin- dawg';
}
   
   

                    
               