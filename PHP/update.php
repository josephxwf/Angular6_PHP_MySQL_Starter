


<?php

include "header.php";
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}




$data = json_decode(file_get_contents("php://input"));


$sql = "UPDATE userHomeAddress SET name = '$data->name'
        WHERE id = '$data->id'";



$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
     
    while($row = $result->fetch_assoc()) {
        $data = $row; // adding each object to $data[] array. // special syntax
    }
    echo json_encode($data);
} else {
    echo "0";
}

mysqli_close($conn);


?>
