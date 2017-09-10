<?php
include_once('../classes/mysql_connect.php');

$default = 'pheiti123#'; //md5();

$data = json_decode(file_get_contents("php://input"));
$newpassword = mysql_escape_string(trim(strip_tags($data->newpassword))); 
$userid = mysql_escape_string(trim(strip_tags($data->id)));

$query = "update users 
                set 
                    password = '".$newpassword."'
                where id = '".$userid."'";

$update = mysql_query($query);

if (!$update) {
    print(mysql_error());
    exit();
}

print('Password change successful.');
exit();    



?>