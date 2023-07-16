<?php
    include 'config.php';
    $sql = "SELECT * FROM `todos` ORDER BY `task` ASC";
    $result = mysqli_query($conn, $sql) or die("sql error");
    $output = [];
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $output[] = $row;
        }
    }
    $conn->close();
    echo json_encode($output);
?>