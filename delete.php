<?php 
require_once 'database.inc.php';
/*
Javascript: parseInt()
PHP:intval()
Javascript: parseFloat()
PHP: floatval()

*/
if(isset($_POST['id']) AND
    !empty($_POST['id'])
  ) {
    $delete_query = "DELETE FROM gradeinput WHERE `id` = ".addslashes($_POST['id']);
    echo($delete_query);
    $delete_result= mysqli_query($conn, $delete_query);
    var_dump($delete_result);
}
?>