<?php 

require_once('mysql_connect.php');

Class Search {
	
	function __construct() {
		/**/
	}

 	function checkExactResult($data){
		if ($data) {
			foreach ($data as $key => $value) {
				if ($value['exact']=="1" || $value['exact']==TRUE) {
					return TRUE;
				}
			}
		}
		return FALSE;
	}

	/* Resources Search Option */

	function search_apr($keyword){
		$aprData = array();

		$query = "select
						arid,
						title_id,
						title,
						coverage,
						CASE 
							when title = '$keyword' then true
							else false
						END as exact
					from resources_activity_reports 
					where
						title like '$keyword%' or
						title like '%$keyword' or
						title like '%$keyword%' 
					order by title asc
						limit 5";

		$getResult = mysql_query($query);

        if (!$getResult) {
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

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $aprData[] = $res;
		    }

		  	return array('success'=>true,
						 'data'=>$aprData,
						 'hasExactMatch'=>self::checkExactResult($aprData),
						 'section'=>'Activity Report');
		    exit();
		}
		else {
		    return array('success'=>true,
						 'data'=> array(),
						 'section'=>'Activity Report');
		    exit();    
		}
	}

	function search_brochures($keyword){
		$brochureData = array();

		$query = "select
						brochures_id,
						title_id,
						title,
						year,
						month,
						file_url,
						CASE 
							when title = '$keyword' then true
							else false
						END as exact
					from resources_brochures 
					where
						title like '$keyword%' or
						title like '%$keyword' or
						title like '%$keyword%' 
					order by title asc
						limit 5";

		$getResult = mysql_query($query);

        if (!$getResult) {
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

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $brochureData[] = $res;
		    }

		  	return array('success'=>true,
						 'data'=>$brochureData,
						 'hasExactMatch'=>self::checkExactResult($brochureData),
						 'section'=>'Brochures');
		    exit();
		}
		else {
		    return array('success'=>true,
						 'data'=> array(),
						 'section'=>'Brochures');
		    exit();    
		}
	}

	function search_gis($keyword){
		$gisData = array();

		$query = "select
						gisid,
						year,
						folder_name,
						folder_id,
						title_id,
						title,
						file_url,
						CASE 
							when title = '$keyword' then true
							else false
						END as exact
					from resources_gis 
					where
						title like '$keyword%' or
						title like '%$keyword' or
						title like '%$keyword%' 
					order by title asc
						limit 5";

		$getResult = mysql_query($query);

        if (!$getResult) {
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

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $gisData[] = $res;
		    }

		  	return array('success'=>true,
						 'data'=>$gisData,
						 'hasExactMatch'=>self::checkExactResult($gisData),
						 'section'=>'General Information Sheet');
		    exit();
		}
		else {
		    return array('success'=>true,
						 'data'=> array(),
						 'section'=>'General Information Sheet');
		    exit();    
		}
	}

	function search_studies($keyword){
		$studiesData = array();

		$query = "select
						stid,
						title_id,
						title,
						file_url,
						year,
						month,
						CASE 
							when title = '$keyword' then true
							else false
						END as exact
					from resources_studies 
					where
						title like '$keyword%' or
						title like '%$keyword' or
						title like '%$keyword%' 
					order by title asc
						limit 5";

		$getResult = mysql_query($query);

        if (!$getResult) {
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

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $studiesData[] = $res;
		    }

		  	return array('success'=>true,
						 'data'=>$studiesData,
						 'hasExactMatch'=>self::checkExactResult($studiesData),
						 'section'=>'Studies');
		    exit();
		}
		else {
		    return array('success'=>true,
						 'data'=> array(),
						 'section'=>'Studies');
		    exit();    
		}
	}

	function search_wplan($keyword){
		$workplanData = array();

		$query = "select
						wpid,
						title,
						year_covered,
						file_url,
						CASE 
							when title = '$keyword' then true
							else false
						END as exact
					from resources_work_plan 
					where
						title like '$keyword%' or
						title like '%$keyword' or
						title like '%$keyword%' 
					order by title asc
						limit 5";

		$getResult = mysql_query($query);

        if (!$getResult) {
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

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $workplanData[] = $res;
		    }

		  	return array('success'=>true,
						 'data'=>$workplanData,
						 'hasExactMatch'=>self::checkExactResult($workplanData),
						 'section'=>'Work Plan');
		    exit();
		}
		else {
		    return array('success'=>true,
						 'data'=> array(),
						 'section'=>'Work Plan');
		    exit();    
		}
	}

	function search_laws($keyword){
		$lawsData = array();

		$query = "select
						lliid,
						category,
						level,
						title,
						file_url,
						description,
						CASE 
							when title = '$keyword' then true
							else false
						END as exact
					from resources_laws_and_legal_issuances 
					where
						title like '$keyword%' or
						title like '%$keyword' or
						title like '%$keyword%' 
					order by title asc
						limit 5";

		$getResult = mysql_query($query);

        if (!$getResult) {
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

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $lawsData[] = $res;
		    }

		  	return array('success'=>true,
						 'data'=>$lawsData,
						 'hasExactMatch'=>self::checkExactResult($lawsData),
						 'section'=>'Work Plan');
		    exit();
		}
		else {
		    return array('success'=>true,
						 'data'=> array(),
						 'section'=>'Work Plan');
		    exit();    
		}
	}

	function search_orgdocs($keyword){
		$orgdocsData = array();

		$query = "select
						orgdocid,
						folder_id,
						folder_name,
						file_title,
						file_id,
						file_url,
						CASE 
							when file_title = '$keyword' then true
							else false
						END as exact
					from resources_organizational_documents
					where
						file_title like '$keyword%' or
						file_title like '%$keyword' or
						file_title like '%$keyword%' 
					order by file_title asc
						limit 5";

		$getResult = mysql_query($query);

        if (!$getResult) {
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

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $orgdocsData[] = $res;
		    }

		  	return array('success'=>true,
						 'data'=>$orgdocsData,
						 'hasExactMatch'=>self::checkExactResult($orgdocsData),
						 'section'=>'Organization Documents');
		    exit();
		}
		else {
		    return array('success'=>true,
						 'data'=> array(),
						 'section'=>'Organization Documents');
		    exit();    
		}
	}

	function search_infographics($keyword){
		$infographicsData = array();

		$query = "select
						infographics_id,
						title,
						title_id,
						file_url,
						year,
						month,
						CASE 
							when title = '$keyword' then true
							else false
						END as exact
					from resources_infographics 
					where
						title like '$keyword%' or
						title like '%$keyword' or
						title like '%$keyword%' or 
						('$keyword' like 'infographic' or 
						'$keyword' like 'infographics' or 
						'$keyword' like 'Infographic' or 
						'$keyword' like 'Infographics')
					order by title asc
						limit 5";

		$getResult = mysql_query($query);

        if (!$getResult) {
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

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $infographicsData[] = $res;
		    }

		  	return array('success'=>true,
						 'data'=>$infographicsData,
						 'hasExactMatch'=>self::checkExactResult($infographicsData),
						 'section'=>'Infographics');
		    exit();
		}
		else {
		    return array('success'=>true,
						 'data'=> array(),
						 'section'=>'Infographics');
		    exit();    
		}
	}
	/* End: Resources Search Option */

	public function search_Activities($keyword){
		$activitiesData = array();

		/*$query = 	"select
						presentation_id,
						activities_id_fk,
						presentation_title,
						presentation_url,
						activities.title 
					from activities_presentations
						left join activities on activities_presentations.activities_id_fk = activities.id
					where activities.title like '%$keyword%' or 
						activities.title like '$keyword%' or
						activities.title like '%$keyword'
						group by activities.id
						order by activities.title asc
						limit 5";*/

		$query = "select
						id,
						href,
						title,
						CASE 
							when title = '$keyword' then true
							else false
						END as exact
					from activities 
					where
						title like '$keyword%' or
						title like '%$keyword' or
						title like '%$keyword%' 
					order by title asc
						limit 5";

		$getResult = mysql_query($query);

        if (!$getResult) {
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

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $activitiesData[] = $res;
		    }

		  	return array('success'=>true,
						 'data'=>$activitiesData,
						 'hasExactMatch'=>self::checkExactResult($activitiesData),
						 'section'=>'Activities');
		    exit();
		}
		else {
		    return array('success'=>true,
						 'data'=> array(),
						 'section'=>'Activities');
		    exit();    
		}
	}

	public function search_Resources($keyword){
		$allResourcesData = array('data'=>array(),
								  'section'=>'Resources');

		$apr_data = self::search_apr($keyword);
		$brochures_data = self::search_brochures($keyword);
		$gis_data = self::search_gis($keyword);
		$studies_data = self::search_studies($keyword);
		$wplan_data = self::search_wplan($keyword);
		$laws_data = self::search_laws($keyword);
		$orgdocs_data = self::search_orgdocs($keyword);
		$infographics_data = self::search_infographics($keyword);

		if (count($apr_data['data']) > 0){
			array_push($allResourcesData['data'],$apr_data);
		}
		if (count($brochures_data['data']) > 0){
			array_push($allResourcesData['data'],$brochures_data);
		}
		if (count($gis_data['data']) > 0){
			array_push($allResourcesData['data'],$gis_data);
		}
		if (count($studies_data['data']) > 0){
			array_push($allResourcesData['data'],$studies_data);
		}
		if (count($wplan_data['data']) > 0){
			array_push($allResourcesData['data'],$wplan_data);
		}
		if (count($laws_data['data']) > 0){
			array_push($allResourcesData['data'],$laws_data);
		}
		if (count($orgdocs_data['data']) > 0){
			array_push($allResourcesData['data'],$orgdocs_data);
		}
		if (count($infographics_data['data']) > 0){
			array_push($allResourcesData['data'],$infographics_data);
		}
		return $allResourcesData;
	}

	public function search_CountryReports($keyword){
		$reportsData = array();

		$query = "select
						crid,
						title,
						year,
						month,
						coverage,
						CASE 
							when title = '$keyword' then true
							else false
						END as exact
					from country_reports 
					where
						title like '$keyword%' or
						title like '%$keyword' or
						title like '%$keyword%' 
					order by title asc
						limit 5";

		$getResult = mysql_query($query);

        if (!$getResult) {
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

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $reportsData[] = $res;
		    }

		  	return array('success'=>true,
						 'data'=>$reportsData,
						 'hasExactMatch'=>self::checkExactResult($reportsData),
						 'section'=>'Country Reports');
		    exit();
		}
		else {
		    return array('success'=>true,
						 'data'=> array(),
						 'section'=>'Country Reports');
		    exit();    
		}
	}

	public function search_News($keyword){
		$newsData = array();

		$query = "select
						pk,
						id,
						title,
						section,
						CASE 
							when title = '$keyword' then true
							else false
						END as exact,
						date_created
					from news 
					where
						(title like '$keyword%' or
						title like '%$keyword' or
						title like '%$keyword%') and 
						published is true
					order by title asc,
						date_created asc
						limit 5";

		$getResult = mysql_query($query);

        if (!$getResult) {
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

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $newsData[] = $res;
		    }

		  	return array('success'=>true,
						 'data'=>$newsData,
						 'hasExactMatch'=>self::checkExactResult($newsData),
						 'section'=>'News');
		    exit();
		}
		else {
		    return array('success'=>true,
						 'data'=> array(),
						 'section'=>'News');
		    exit();    
		}
	}

	public function search_msgMeetings($keyword){
		$meetingsData = array();

		$query = "select
						mtgid,
						mtg_title,
						mtg_date,
						mtg_time,
						mtg_venue,
						minutes_url,
						with_annex,
						CASE 
							when mtg_title = '$keyword' then true
							else false
						END as exact,
						date_added,
						date_last_updated
					from msg_meetings 
					where
						(mtg_title like '$keyword%' or
						mtg_title like '%$keyword' or
						mtg_title like '%$keyword%' or 
						'$keyword' like '%msg meeting' or 
						'$keyword' like '%MSG Meeting' )
					order by mtg_title asc,
						date_added asc
						limit 5";

		$getResult = mysql_query($query);

        if (!$getResult) {
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

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $meetingsData[] = $res;
		    }

		  	return array('success'=>true,
						 'data'=>$meetingsData,
						 'hasExactMatch'=>self::checkExactResult($meetingsData),
						 'section'=>'MSG Meetings');
		    exit();
		}
		else {
		    return array('success'=>true,
						 'data'=> array(),
						 'section'=>'MSG Meetings');
		    exit();    
		}
	}
}


?>