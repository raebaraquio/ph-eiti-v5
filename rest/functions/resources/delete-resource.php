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
		$return_data = $resources->delete_study($id);
		break;

	case 'APR':
		$return_data = $resources->delete_apr($id);
		break;

	case 'GIS':
		$return_data = $resources->delete_gis($id);
		break;

	case 'OrgDocs':
		$return_data = $resources->delete_orgdoc($id);
		break;

	case 'Laws':
		$return_data = $resources->delete_law($id);
		break;

	case 'Infographics':
		$return_data = $resources->delete_infographic($id);
		break;
	
	case 'Brochures':
		$return_data = $resources->delete_brochure($id);
		break;
	
	case 'WorkPlan':
		$return_data = $resources->delete_workplan($id);
		break;
}

print(json_encode($return_data));

?>
