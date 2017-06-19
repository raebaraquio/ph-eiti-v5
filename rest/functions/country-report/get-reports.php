<?php 
require_once('CountryReport.php');
require_once('../../classes/mysql_connect.php');

$cond = NULL;
if (isset($_GET['id']) && $_GET['id']!==NULL) {
	$id = mysql_escape_string(strip_tags($_GET['id']));
	$cond = ' where id = '.$id;
} 

$report = new CountryReport();
$return_report = $report->get_country_reports($cond);
print(json_encode($return_report));

?>
