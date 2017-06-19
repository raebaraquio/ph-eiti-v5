<?php
require_once('../../classes/mysql_connect.php');

Class CountryReport{
	
	function __construct() {
		/**/
	}

	function get_country_reports($cond){
		$reports = array();
		$query = "select
					crid,
					title,
					year,
					month,
					coverage,
					card_icon_url,
					date_added,
					date_last_updated
				from country_reports 
				$cond
				order by date_added asc
					";

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
		        $reports[] = $res;
		    }
		    return $reports;
		}
		else {
		    return $reports;
		}
	}

	function get_report_content($id){
		$content_data = array();

		$query = "select
						crcontent_id,
						crid_fk,
						title,
						content_type,
						file_url,
						card_icon_url,
						date_added,
						date_last_updated
					from country_reports_content 
					where
						crid_fk = $id
					order by date_added asc";

		$getResult = mysql_query($query);

        if (!$getResult) {
            print(json_encode(
            	array(
            		'success'=>false,
                    'error'=>'database',
                    'status'=>'selectError in get gallery',
                    'mysqlerror'=>mysql_error(),
                    'query'=>$query)
            	)
            );
            exit();
        }

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $content_data[] = $res;
		    }

		  	return $content_data;
		}
		else {
		    return array();
		}
	}

	function get_one_content($id,$contentid){
		$content_data = NULL;

		$query = "select
						crcontent_id,
						crid_fk,
						title,
						content_type,
						file_url,
						card_icon_url,
						date_added,
						date_last_updated
					from country_reports_content 
					where
						crid_fk = $id and 
						crcontent_id = $contentid
					order by date_added asc";

		$getResult = mysql_query($query);

        if (!$getResult) {
            print(json_encode(
            	array(
            		'success'=>false,
                    'error'=>'database',
                    'status'=>'selectError in get gallery',
                    'mysqlerror'=>mysql_error(),
                    'query'=>$query)
            	)
            );
            exit();
        }

        if (mysql_num_rows($getResult) > 0) {

		    while ($res = mysql_fetch_assoc($getResult)) {
		        $content_data = $res;
		    }

		  	return $content_data;
		}
		else {
		    return NULL;
		}
	}

	function get_content_ids($report,$content){
		$ids = NULL;
		$query = "select
					crcontent_id,
					crid_fk
				from country_reports_content
				where title = '".$content."'
					and crid_fk = (select 
										crid 
									from country_reports 
										where title = '".$report."') ";

		$getResult = mysql_query($query);

        if (!$getResult) {
            print(json_encode(
            	array(
            		'success'=>false,
                    'error'=>'database',
                    'status'=>'selectError in get ids',
                    'mysqlerror'=>mysql_error(),
                    'query'=>$query)
            	)
            );
            exit();
        }

        if (mysql_num_rows($getResult) > 0) {
		    while ($res = mysql_fetch_assoc($getResult)) {
		        $ids = $res;
		    }
		  	return $ids;
		}
		else {
		   	return $ids;
		}
	}

	function get_reporting_templates($crid,$contentid){
		$reportingTemplates = array();

		$query = "select
						crtid,
						crcontent_id_fk,
						crid_fk,
						sector,
						title,
						company_agency_name,
						file_url,
						date_added,
						date_last_updated
					from completed_reporting_templates 
					where
						crid_fk = $crid
						and crcontent_id_fk = $contentid
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
		        $reportingTemplates[] = $res;
		    }
		  	return $reportingTemplates;
		}
		else {
		    return array();
		}
	}

	function get_other_files($crid,$contentid){
		$files = array();

		$query = "select
						file_id,
						title,
						file_url,
						date_added,
						date_last_updated,
						crid_fk,
						crcontent_id_fk
					from country_report_otherfiles 
					where
						crid_fk = $crid
						and crcontent_id_fk = $contentid
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
		        $files[] = $res;
		    }
		  	return $files;
		}
		else {
		    return array();
		}
	}

	function get_templates_sector(){
		$sectors = array();

		$query = "select
						sector
					from reporting_templates 
					group by sector
					order by sector desc";

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
		        $sectors[] = $res['sector'];
		    }
		  	return $sectors;
		}
		else {
		    return array();
		}
	}

	function get_templates_yrs(){
		$years = array();

		$query = "select
						year
					from reporting_templates 
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
		        $years[] = $res['year'];
		    }
		  	return $years;
		}
		else {
		    return array();
		}
	}

	function get_templates($crid,$contentid){
		$reportingTemplates = array();

		$query = "select
						rtid,
						year,
						sector,
						sub_sector,
						title,
						company_agency_name,
						file_url,
						date_added,
						date_last_updated
					from reporting_templates 
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
		        $reportingTemplates[] = $res;
		    }
		  	return $reportingTemplates;
		}
		else {
		    return array();
		}
	}
}

?>