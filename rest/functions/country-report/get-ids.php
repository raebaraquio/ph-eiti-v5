<?php 
require_once('CountryReport.php');
require_once('../../classes/mysql_connect.php');

$report_title = NULL;
if (isset($_GET['report']) && $_GET['report']!==NULL) {
	$report_title = mysql_escape_string(trim(strip_tags($_GET['report'])));
} 

$content_title = NULL;
if (isset($_GET['content']) && $_GET['content']!==NULL) {
	$content_title = mysql_escape_string(trim(strip_tags($_GET['content'])));
} 

$report = new CountryReport();
$return_content = $report->get_content_ids($report_title,$content_title);
print(json_encode($return_content));

?>
