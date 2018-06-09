<?php 
require_once('Activities.php');

$activity_id_fk = NULL;
if (isset($_GET['id']) && $_GET['id']!==NULL) {
    $activity_id_fk = intval(mysql_escape_string(trim(strip_tags($_GET['id']))));
} 

$day_id_fk = NULL;
if (isset($_GET['eventDayId']) && $_GET['eventDayId']!==NULL) {
    $day_id_fk = intval(mysql_escape_string(trim(strip_tags($_GET['eventDayId']))));
} 

$presentation_id = NULL;
if (isset($_GET['presentationId']) && $_GET['presentationId']!==NULL) {
    $presentation_id = intval(mysql_escape_string(trim(strip_tags($_GET['presentationId']))));
} 

$section = '';
if (isset($_GET['section']) && $_GET['section']!==NULL) {
    $section = mysql_escape_string(trim(strip_tags($_GET['section'])));
} 

$deleteMode = '';
if ($section=='Presentation') {
	if (isset($_GET['deleteMode']) && $_GET['deleteMode']!==NULL) {
	    $deleteMode = mysql_escape_string(trim(strip_tags($_GET['deleteMode'])));
	} 	
}

$activity = new Activities();

// delete_section_of_activity
// delete_all_activity_presentations
// delete_eventday_presentations
// delete_one_presentation

switch ($section) {
	case 'Presentation':
		if ($deleteMode=="all") {
			$returndata = $activity->delete_all_activity_presentations($activity_id_fk);
		}
		else if ($deleteMode=="day") {
			$returndata = $activity->delete_eventday_presentations($activity_id_fk,$day_id_fk);
		}
		else if ($deleteMode=="one") {
			$returndata = $activity->delete_one_presentation($activity_id_fk,$day_id_fk,$presentation_id);
		}
		break;
	
	default:
		// About, Program, Documentation, Gallery
		$returndata = $activity->delete_section_of_activity($activity_id_fk,$section);
		break;
}


print(json_encode($returndata));
exit();

?>
