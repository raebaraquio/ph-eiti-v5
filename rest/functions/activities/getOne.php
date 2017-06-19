<?php 
require_once('Activities.php');
require_once('../../classes/mysql_connect.php');

$cond = NULL;
if (isset($_GET['id']) && $_GET['id']!==NULL) {
	$id = mysql_escape_string(strip_tags($_GET['id']));
	$cond = ' where id = '.$id;
} 

$activity = new Activities();

$return_activity = $activity->get_activity($cond);
$return_activity_gallery = $activity->get_gallery($id);
$return_activity_presentations = $activity->get_daysofactivity($id);

$return_activity['gallery'] = $return_activity_gallery;
$return_activity['presentations'] = $return_activity_presentations;

print(json_encode($return_activity));

?>
