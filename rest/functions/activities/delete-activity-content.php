<?php 
require_once('Activities.php');

$activity_id_fk = NULL;
if (isset($_GET['id']) && $_GET['id']!==NULL) {
    $activity_id_fk = intval(mysql_escape_string(trim(strip_tags($_GET['id']))));
} 

$activity = new Activities();
$returndata = $activity->delete_activity($activity_id_fk);
print(json_encode($returndata));
exit();

?>
