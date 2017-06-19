<?php 
require_once('CountryReport.php');
require_once('../../classes/mysql_connect.php');

$crid = NULL;
if (isset($_GET['id']) && $_GET['id']!==NULL) {
	$crid = mysql_escape_string(strip_tags($_GET['id']));
} 

$report = new CountryReport();
$return_content = $report->get_report_content($crid);
print(json_encode($return_content));

?>
