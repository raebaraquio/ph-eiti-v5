<?php
require_once('Search.php');
include_once('../classes/mysql_connect.php');

$keyword = htmlspecialchars($_GET["keyword"]);
$page = htmlspecialchars($_GET["page"]);

if (!isset($keyword)) {
    print(json_encode(
        array(
            'error' => 'No keyword entered.', 
            'success' => false
        )
    ));
}

$newSearch = new Search();

$keyword = mysql_escape_string(trim(strip_tags($keyword)));
$page = mysql_escape_string(trim(strip_tags($page)));
$allData = array();

$returned_search_Activities = $newSearch->search_Activities($keyword);
array_push($allData,$returned_search_Activities);

$returned_search_CountryReports = $newSearch->search_CountryReports($keyword);
array_push($allData,$returned_search_CountryReports);

$returned_search_Resources = $newSearch->search_Resources($keyword);
array_push($allData,$returned_search_Resources);

$returned_search_News = $newSearch->search_News($keyword);
array_push($allData,$returned_search_News);

$returned_search_Meetings = $newSearch->search_msgMeetings($keyword);
array_push($allData,$returned_search_Meetings);

print(json_encode($allData));

?>