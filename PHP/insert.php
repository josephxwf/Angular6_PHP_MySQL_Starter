


<?php

include "header.php";
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


/*

$sql = "INSERT INTO userHomeAddress (name )
VALUES ('John')";

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

*/

$data = json_decode(file_get_contents("php://input"));//contain a hero object sent from  heroservice component clas



$sql = "INSERT INTO userHomeAddress (name)
        VALUES ('$data->name')";

$conn->query($sql);

// need select data from database to send added data back to angular component
$sql2 = "SELECT * FROM userHomeAddress WHERE id = $conn->insert_id ";  
$result = $conn->query($sql2);
if ($result->num_rows > 0) {
    // output data of each row
     
    while($row = $result->fetch_assoc()) {
        $data = $row; // assign new object to $data  
        //$data = json_encode($data); // won't get object value in angular component if added
    }
    echo json_encode($data);
} else {
    echo "0";
}

mysqli_close($conn);


?>
