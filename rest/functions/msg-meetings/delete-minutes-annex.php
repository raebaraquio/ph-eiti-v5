<?php 
require_once('MsgMeetings.php');

$id = NULL;
if (isset($_GET['id']) && $_GET['id']!==NULL) {
    $id = intval(mysql_escape_string(trim(strip_tags($_GET['id']))));
} 

$mUrl = "";
if (isset($_GET['mUrl']) && $_GET['mUrl']!==NULL) {
    $mUrl = mysql_escape_string(trim(strip_tags($_GET['mUrl'])));
} 

$annex_id = NULL;
if (isset($_GET['annexId']) && $_GET['annexId']!==NULL) {
    $annex_id = intval(mysql_escape_string(trim(strip_tags($_GET['annexId']))));
} 

$aUrl = "";
if (isset($_GET['aUrl']) && $_GET['aUrl']!==NULL) {
    $aUrl = mysql_escape_string(trim(strip_tags($_GET['aUrl'])));
}

$meeting = new MsgMeetings();

if ($annex_id!=NULL) {
	$returndata = $meeting->delete_annex($id,$annex_id,$aUrl);
}
else {
	$returndata = $meeting->delete_msg_minutes($id,$mUrl);
}

print(json_encode($returndata));
exit();

?>