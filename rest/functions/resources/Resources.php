<?php
require_once('../../classes/mysql_connect.php');

Class Resources{
	
	function __construct() {
		/**/
	}

	/* Resources Search Option */

	function get_apr(){
		$aprData = array();

		$query = "select
						arid,
						title_id,
						title,
						coverage,
						file_url,
						card_icon_url,
						date_added,
						date_last_updated
					from resources_activity_reports 
					order by date_added asc";

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

		  	return $aprData;
		    exit();
		}
		else {
		    return array();
		    exit();    
		}
	}

	function get_brochures_yr($keyword){
		$brochureData = array();

		$query = "select
						year
					from resources_brochures 
					group by year
					order by year desc";

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
		        $brochureData[] = $res['year'];
		    }

		  	return $brochureData;
		    // exit();
		}
		else {
		    return array();
		    // exit();    
		}
	}

	function get_brochures(){
		$brochureData = array();

		$query = "select
						brochures_id,
						title_id,
						title,
						year,
						month,
						file_url,
						newsletter_issue,
						event_name,
						other_info,
						cardicon_url,
						date_added,
						date_last_updated,
						'Brochures' as contentType
					from resources_brochures 
					order by date_added desc";

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

		  	return $brochureData;
		    exit();
		}
		else {
		    return array();
		    exit();    
		}
	}

	function get_gis_yr(){
		$yearsData = array();

		$query = "select
						year
					from resources_gis
					where year is not NULL AND year != 0
					group by year 
					order by year desc";

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
		        $yearsData[] = $res['year'];
		    }

		  	return $yearsData;
		}
		else {
		    return array();
		}
	}

	function get_gis($keyword){
		$gisData = array();

		$query = "select
						gisid,
						year,
						folder_name,
						folder_id,
						title_id,
						title,
						file_url,
						date_added,
						date_last_updated
					from resources_gis 
					order by date_added desc";

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

		  	return $gisData;
		    exit();
		}
		else {
		    return array();
		    exit();    
		}
	}

	function get_studies_yr(){
		$yearsData = array();

		$query = "select
						year
					from resources_studies
					where year is not NULL AND year != 0
					group by year 
					order by year desc";

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
		        $yearsData[] = $res['year'];
		    }

		  	return $yearsData;
		}
		else {
		    return array();
		}
	}

	function get_studies(){
		$studiesData = array();

		$query = "select
						stid,
						title_id,
						title,
						file_url,
						year,
						month,
						date_added,
						date_last_updated
					from resources_studies 
					order by date_added desc";

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

		  	return $studiesData;
		    exit();
		}
		else {
		    return array();
		    exit();    
		}
	}

	function get_wplan_yrs($keyword){
		$workplanData = array();

		$query = "select
						year_covered
					from resources_work_plan
					group by year_covered
					order by year_covered desc";

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
		        $workplanData[] = $res['year_covered'];
		    }

		  	return $workplanData;
		    exit();
		}
		else {
		    return array();
		    exit();    
		}
	}

	function get_wplan($keyword){
		$workplanData = array();

		$query = "select
						wpid,
						title,
						year_covered,
						file_url,
						date_added,
						date_last_updated,
						CASE 
							when is_specific_wp = 1 then 'Specific'
							else 'Work Plan'
						END as workplan_type
					from resources_work_plan
					order by year_covered desc";

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

		  	return $workplanData;
		    exit();
		}
		else {
		    return array();
		    exit();    
		}
	}

	function get_laws($keyword){
		$lawsData = array();

		$query = "select
						lliid,
						category,
						level,
						title,
						file_url,
						description,
						date_added,
						date_last_updated
					from resources_laws_and_legal_issuances 
					order by date_added asc";

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

		  	return $lawsData;
		    exit();
		}
		else {
		    return array();
		    exit();    
		}
	}

	function get_orgdocs_folders(){
		$orgdocsData = array();

		$query = "select
						folder_id,
						folder_name,
						count(*) as files
					from resources_organizational_documents
					where folder_name != ''
					group by folder_name";

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

		  	return $orgdocsData;
		    exit();
		}
		else {
		    return array();
		    exit();    
		}
	}

	function get_orgdocs_files(){
		$orgdocsData = array();

		$query = "select
						orgdocid,
						folder_id,
						folder_name,
						file_title,
						file_id,
						file_url,
						date_added,
						date_last_updated
					from resources_organizational_documents
					order by date_added asc";

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

		  	return $orgdocsData;
		    exit();
		}
		else {
		    return array();
		    exit();    
		}
	}

	function get_infographics_yr(){
		$infographicsData = array();

		$query = "select
						year
					from resources_infographics
					group by year
					order by year desc";

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
		        $infographicsData[] = $res['year'];
		    }

		  	return $infographicsData;
		    exit();
		}
		else {
		    return array();
		    exit();    
		}
	}

	function get_infographics(){
		$infographicsData = array();

		$query = "select
						infographics_id,
						title,
						title_id,
						file_url,
						year,
						month,
						file_url,
						newsletter_issue,
						event_name,
						other_info,
						cardicon_url,
						date_added,
						date_last_updated,
						'Infographics' as contentType
					from resources_infographics
					order by date_added desc";

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

		  	return $infographicsData;
		    exit();
		}
		else {
		    return array();
		    exit();    
		}
	}

}

?>