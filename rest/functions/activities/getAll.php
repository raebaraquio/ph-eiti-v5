<?php 
require_once('../../classes/mysql_connect.php');

$cond = NULL;
if (isset($_GET['year']) && $_GET['year']!==NULL) {
	$cond = ' where YEAR(activity_start_date) = '.mysql_escape_string(strip_tags($_GET['year']));
} 
/* Original query
select
	id,
	href,
	title,
	activity_start_date,
	activity_end_date,
	activity_venue,
	coverphoto_url,
	writeup_content,
	writeup_title,
	withOfflineGallery,
	fbPhotoAlbum_url,
	program_url,
	documentation_url,
	date_added,
	date_last_updated,
	workshop_output_url
from activities 
where YEAR(activity_start_date) = '2013'
order by date_added desc
*/
$query = "select
			id,
			href,
			title,
			activity_start_date,
			activity_end_date,
			activity_venue,
			coverphoto_url,
			date_added,
			date_last_updated,
			workshop_output_url
		from activities 
		$cond
		order by date_added desc
			";

$getResult = mysql_query($query);

if (!$getResult) {
	// print("error" .$query);
    print(json_encode(
    	array(
    		'success'=>false,
            'error'=>'database',
            'status'=>'selectError',
            'mysqlerror'=>mysql_error(),
            'query'=>$query)
    	)
    );
    exit();
}

// print("no error" .mysql_num_rows($getResult));

if (mysql_num_rows($getResult) > 0) {
	// print_r(mysql_fetch_assoc($getResult));
	// exit();
	$activitiesData = array();
    while ($res = mysql_fetch_assoc($getResult)) {
		// $activitiesData[] = $res;
		array_push($activitiesData,$res);
	}
	// $activitiesData = mysql_fetch_assoc($getResult);
  	print(json_encode($activitiesData));
    exit();
}
else {
	print(json_encode(array()));
	// print("here empty array");
    exit();    
}

?>
