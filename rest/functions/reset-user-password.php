<?php
include_once('../classes/mysql_connect.php');

$default = 'pheiti123#'; //md5();
$user = mysql_escape_string(trim(strip_tags($_GET['id'])));

$query = "update users 
                set 
                    password = '".$default."'
                where id = '".$user."'";

$update = mysql_query($query);

if (!$update) {
    print(mysql_error());
    exit();
}

print('Password reset successful.');
exit();    



?>