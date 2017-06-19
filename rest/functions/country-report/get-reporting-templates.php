<?php 
require_once('CountryReport.php');
require_once('../../classes/mysql_connect.php');

$report = new CountryReport();

$return_report['years'] = $report->get_templates_yrs();
$return_report['sectors'] = $report->get_templates_sector();
$return_report['templates'] = $report->get_templates();

print(json_encode($return_report));

?>
