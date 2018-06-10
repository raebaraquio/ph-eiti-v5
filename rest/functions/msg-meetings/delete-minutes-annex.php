<?php 
require_once('MsgMeetings.php');

$id = NULL;
if (isset($_GET['id']) && $_GET['id']!==NULL) {
    $id = intval(mysql_escape_string(trim(strip_tags($_GET['id']))));
} 

$annex_id = NULL;
if (isset($_GET['annexId']) && $_GET['annexId']!==NULL) {
    $annex_id = intval(mysql_escape_string(trim(strip_tags($_GET['annexId']))));
} 

$meeting = new MsgMeetings();

if ($annex_id!=NULL) {
	$returndata = $meeting->delete_annex($id,$annex_id);
}
else {
	$returndata = $meeting->delete_msg_minutes($id);
}

print(json_encode($returndata));
exit();

?>