<?php
include_once('../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));

$userid = mysql_escape_string(trim(strip_tags($data->id)));
$name = mysql_escape_string(trim(strip_tags($data->name)));
$position = mysql_escape_string(trim(strip_tags($data->position)));
$email = mysql_escape_string(trim(strip_tags($data->email))); 
$mobile = mysql_escape_string(trim(strip_tags($data->mobile))); 


$query = "update users
            set 
                name = '$name',
                email = '$email',
                position = '$position',
                mobile = '$mobile'
        where id = '$userid' ";


$get = mysql_query($query);

if (!$get) {
    print(mysql_error()." ".$query);
    // print('An error occurred while update profile. Please try again later.');
    exit();
}

print ('Changes saved.');
exit();

?>