<?php
include_once('../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));

$name = mysql_escape_string(trim(strip_tags($data->name)));
$desc = '';
if ($data->description!='' && !empty($data->description)) {
	$desc = mysql_escape_string(nl2br(trim($data->description)));	
}

$status = mysql_escape_string(trim(strip_tags($data->reportstatus))); 
$addedby = mysql_escape_string(trim(strip_tags($data->addedby))); 


$query = <<<EOT
			insert into statusreport
				(task,
				addedby,
				reportstatus,
				description)
			values
				('$name',
				'$addedby',
				'$status',
				'$desc');
EOT;


$get = mysql_query($query);

if (!$get) {
    print(mysql_error()." ".$query);
    // print('An error occurred while update profile. Please try again later.');
    exit();
}

print ('Task saved.');
exit();

?>