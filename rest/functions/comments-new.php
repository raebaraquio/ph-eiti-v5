<?php
include_once('../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));

$name = mysql_escape_string(trim(strip_tags($data->name)));
$email = mysql_escape_string(trim(strip_tags($data->email)));
$contact = mysql_escape_string(trim(strip_tags($data->contact)));
$mode = mysql_escape_string(trim(strip_tags($data->mode)));
$comment = mysql_escape_string(nl2br(trim($data->comment)));

$query = "insert into comments
                (name,
                 email,
                 contactnum,
                 comment,
                 posted_in)
            values
                ('$name',
                '$email',
                '$contact',
                '$comment',
                '$mode')";
             
$get = mysql_query($query);

if (!$get) {
    print(mysql_error()." ".$query);
    exit;
}

$currval = mysql_insert_id();
print $currval;

?>