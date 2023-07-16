<?php
    include "config.php";
    $input = file_get_contents('php://input');
    $decode = json_decode($input,true);
    echo $decode['task'];
    $sql = "INSERT INTO `todos`(`task`, `prio`, `time`) VALUES ('{$decode['task']}', '{$decode['prio']}', '{$decode['time']}')" ;
    mysqli_query($conn, $sql) or die("Sql error");
    $conn->close();
?>