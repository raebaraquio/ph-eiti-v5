<?php 
require_once('../../classes/mysql_connect.php');


$return_data = NULL;
$errorCount = 0;
$lastError = '';

$post = file_get_contents('php://input');
$data = json_decode($post);

$title = mysql_escape_string(trim(strip_tags($data->title)));
$coverage = mysql_escape_string(trim(strip_tags($data->coverage)));
$year = mysql_escape_string(trim(strip_tags($data->year)));
$month = mysql_escape_string(trim(strip_tags($data->month)));
$defualt_card_icon = '../document/EITI-Report/card-icon.png';

$insertQuery = "insert into country_reports
                    (title,
                    coverage,
                    year,
                    month,
                    card_icon_url)
                values
                    ('".$title."',
                    '".$coverage."',
                    '".$year."',
                    '".$month."',
                    '".$defualt_card_icon."')";

$inserted = mysql_query($insertQuery);
$crid = intval(mysql_insert_id());

if (!$inserted) {
    print(json_encode(array('success'=>false,
                            'status'=>'sqlerror-'.mysql_error())));
    exit();
}

// Create Content for Completed Reporting Templates
/* 
$initParentQuery = "insert into country_reports_content
                    (crid_fk,
                    title,
                    content_type,
                    file_url,
                    card_icon_url)
                values
                    ('".$crid."',
                    'Completed Reporting Templates',
                    'page',
                    '',
                    '".$defualt_card_icon."')";

$init = mysql_query($initParentQuery);

if (!$init) {
    print(json_encode(array('success'=>false,
                            'status'=>'sqlerror-'.mysql_error())));
    exit();
} */
// End: Create Content for Completed Reporting Templates

print(json_encode(array('success'=>true,
                        'status'=>'fileuploaded')));
exit();


?>
