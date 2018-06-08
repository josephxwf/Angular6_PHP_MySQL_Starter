<?php

header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, X-Requested-With, Accept');

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "smalltown";
$port = 3306;
$conn = new mysqli($servername, $username, $password, $dbname,$port);
?>

