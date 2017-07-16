<?php
require_once('Search.php');
include_once('../classes/mysql_connect.php');

$keyword = htmlspecialchars($_GET["keyword"]);
$page = htmlspecialchars($_GET["page"]);
$contentType = htmlspecialchars($_GET["contentType"]);

if (!isset($keyword)) {
    print(json_encode(
        array(
            'error' => 'No keyword entered.', 
            'success' => false
        )
    ));
   	exit();
}

$newSearch = new Search();

$keyword = mysql_escape_string(trim(strip_tags($keyword)));
$page = mysql_escape_string(trim(strip_tags($page)));
$allData = array();

if ($contentType=="") {
	$returned_search_Activities = $newSearch->search_Activities($keyword);
	array_push($allData,$returned_search_Activities);
}

if ($contentType=="" || $contentType=="Article") {
	$returned_search_News = $newSearch->search_News($keyword);
	array_push($allData,$returned_search_News);	
}

if ($contentType!=="Article") {
	$returned_search_Meetings = $newSearch->search_msgMeetings($keyword);
	array_push($allData,$returned_search_Meetings);	
}

/* If Content Type is Document or unspecified, run the following search: 
	Country Reports
	Country Reports - Completed Reporting Templates
	Country Reports - Computation of LGU Shares in National Wealth
	Resources
	MSG Meetings - File Annexes
	Reporting Templates
*/
if ($contentType=="" || $contentType=="Document") {
	$returned_search_Resources = $newSearch->search_Resources($keyword);
	array_push($allData,$returned_search_Resources);	

	$returned_search_MeetingsAnnexes = $newSearch->search_msgMeetingAnnex($keyword);
	array_push($allData,$returned_search_MeetingsAnnexes);	

	$returned_search_reportingTemplates = $newSearch->search_reportingTemplates($keyword);
	array_push($allData,$returned_search_reportingTemplates);	

	$returned_search_CountryReports = $newSearch->search_CountryReports($keyword);
	array_push($allData,$returned_search_CountryReports);	

	$returned_search_completedReportingTemplates = $newSearch->search_completedReportingTemplates($keyword);
	array_push($allData,$returned_search_completedReportingTemplates);		

	/* For Country Report Content - Other Files */
	$returned_search_countryReportsOther = $newSearch->search_countryReportsOtherContent($keyword);
	array_push($allData,$returned_search_countryReportsOther);

	/* For Country Report Content - where content type != 'Page' */
	$returned_search_countryReportsContent = $newSearch->search_countryReportsContent($keyword);
	array_push($allData,$returned_search_countryReportsContent);
}

/* For Country Report Content - where content type == 'Page' */
if ( $contentType=="Page" || ( $contentType=="" && (strtolower($keyword)=='reporting templates' || strtolower($keyword)=='completed reporting templates' || 
												    strtolower($keyword)=='completed reporting template') )
						  || ( $contentType=="" && (strtolower($keyword)=='lgu share' || strtolower($keyword)=='lgu shares' || strtolower($keyword)=='computation of lgu shares' || 
												    strtolower($keyword)=='computation of lgu shares in national wealth') ) ) {
	$returned_search_completedReportingTemplatesPage = $newSearch->searchpage_completedReportingTemplates($keyword);
	array_push($allData,$returned_search_completedReportingTemplatesPage);
}

print(json_encode($allData));

?>