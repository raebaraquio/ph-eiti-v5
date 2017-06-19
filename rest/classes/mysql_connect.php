<?php
// Uncomment for production
$username = "pheitior_admin";
$password = "coC0m4rte3n";
$hostname = "localhost";
$database = "pheitior_db";

// Uncomment for local
// $username = "root";
// $password = "eitiroot";
// $hostname = "localhost";
// $database = "pheitior_eiti";

//connection to the database
$dbhandle = mysql_connect($hostname, $username, $password) 
  or die(mysql_error());
// echo "Connected to MySQL<br>";

$selected = mysql_select_db($database,$dbhandle) 
  or die("Could not select examples");
?>