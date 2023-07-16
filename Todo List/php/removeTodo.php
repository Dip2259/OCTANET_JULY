<?php
    include "config.php";
    $input = file_get_contents('php://input');
    $decode = json_decode($input,true);
    $sql = "DELETE FROM `todos` WHERE `task` = '{$decode['task']}'" ;
    mysqli_query($conn, $sql) or die("Sql error");
    $conn->close();
?>