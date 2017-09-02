<?php 
require_once('Activities.php');

$activity_id_fk = NULL;
if (isset($_GET['id']) && $_GET['id']!==NULL) {
    $activity_id_fk = intval(mysql_escape_string(trim(strip_tags($_GET['id']))));
} 

$activity = new Activities();
$returndata = $activity->get_daysofactivity($activity_id_fk,TRUE);
print(json_encode($returndata));
exit();

?>
