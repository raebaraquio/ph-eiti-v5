<?php 
require_once('CountryReport.php');
require_once('../../classes/mysql_connect.php');

$report_id = NULL;
if (isset($_GET['report_id']) && $_GET['report_id']!==NULL) {
	$report_id = mysql_escape_string(trim(strip_tags($_GET['report_id'])));
} 

$content_id = NULL;
if (isset($_GET['content_id']) && $_GET['content_id']!==NULL) {
	$content_id = mysql_escape_string(trim(strip_tags($_GET['content_id'])));
} 

$content_title = NULL;
if (isset($_GET['content_title']) && $_GET['content_title']!==NULL) {
	$content_title = mysql_escape_string(trim(strip_tags($_GET['content_title'])));
} 

$report = new CountryReport();
$return_content['annex'] = $report->get_one_content($report_id,$content_id); 
$return_content['completedTemplates'] = array();
$return_content['files'] = array();
if ($content_title=='Completed Reporting Templates') {
	$return_content['completedTemplates'] = $report->get_reporting_templates($report_id,$content_id);
}
else {
	$return_content['files'] = $report->get_other_files($report_id,$content_id);
}

print(json_encode($return_content));

?>
