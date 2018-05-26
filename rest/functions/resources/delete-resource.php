<?php 
require_once('Resources.php');
require_once('../../classes/mysql_connect.php');

if (isset($_GET['resourceType']) && $_GET['resourceType']!==NULL) {
	$resourceType = mysql_escape_string(trim(strip_tags($_GET['resourceType'])));
} 

if (isset($_GET['id']) && $_GET['id']!==NULL) {
	$id = mysql_escape_string(trim(strip_tags($_GET['id'])));
} 


$resources = new Resources();

$return_data = NULL;

switch ($resourceType) {
	case 'Studies':
		// $return_data['studies'] = $resources->get_studies();
		// $return_data['years'] = $resources->get_studies_yr();
		break;

	case 'APR':
		$return_data = $resources->delete_apr($id);
		break;

	case 'GIS':
		// $return_data['gis'] = $resources->get_gis();
		// $return_data['years'] = $resources->get_gis_yr();
		break;

	case 'OrgDocs':
		// $return_data['subfolders'] = $resources->get_orgdocs_folders();
		// $return_data['files'] = $resources->get_orgdocs_files();
		break;

	case 'Laws':
		// $return_data = $resources->get_laws();
		break;

	case 'Infographics':
		// $year_arr = array_merge($resources->get_brochures_yr(),$resources->get_infographics_yr());
		// $sortedYears = array_unique($year_arr, SORT_REGULAR);
		// $return_data['years'] = array();
		// foreach ($sortedYears as $key => $value) {
		// 	array_push($return_data['years'],$sortedYears[$key]);
		// }
		// $return_data['content'] = array_merge($resources->get_infographics(),$resources->get_brochures());
		break;
	
	case 'WorkPlan':
		// $return_data['years'] = $resources->get_wplan_yrs();
		// $return_data['workplans'] = $resources->get_wplan();
		break;
}

print(json_encode($return_data));

?>
