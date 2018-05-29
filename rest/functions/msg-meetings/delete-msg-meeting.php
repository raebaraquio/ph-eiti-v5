<?php 
require_once('MsgMeetings.php');

$id = NULL;
if (isset($_GET['id']) && $_GET['id']!==NULL) {
    $id = intval(mysql_escape_string(trim(strip_tags($_GET['id']))));
} 

$meeting = new MsgMeetings();
$returndata = $meeting->delete_msg_meeting($id);
print(json_encode($returndata));
exit();

?>