<?php
require_once 'database.inc.php';
$select_query ='SELECT `g`.`grade_id`, `g`.`grade`,`s`.* FROM `gradeinput` AS `g` JOIN `students` AS `s` ON `s`.`student_id` = `g`.`student_id`';
//every colomn from every row
//$select_query= 'SELECT * FROM `gradeinput`';

$results= mysqli_query($conn, $select_query);
//stores every bit of information in the database
$grades = [];

while($row=mysqli_fetch_assoc($results)) {
    //Add every grade row into grades array
    $grades[] = $row;
}

echo json_encode($grades);
?>


