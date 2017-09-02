<?php
require_once('../../classes/mysql_connect.php');

Class Activities{
	
	function __construct() {
		/**/
	}

	function get_activity($cond){
		$activity = NULL;
		$query = "select
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
				$cond
				order by date_added desc
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
		        $activity = $res;
		    }
		    return $activity;
		}
		else {
		    return $activity;
		}
	}

	function get_gallery($id){
		$images_data = array();

		$query = "select
						img_id,
						img_title,
						img_url,
						date_added,
						activities_id_fk
					from activities_img_gallery 
					where
						activities_id_fk = $id
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
		        $images_data[] = $res;
		    }

		  	return $images_data;
		}
		else {
		    return array();
		}
	}

	function get_daysofactivity($id,$daysFlag){
		$days_data = array();

		$query = "select
						activities_id_fk,
						day_id,
						event_day,
						event_date,
						date_added
					from day_of_activities 
					where
						activities_id_fk = $id
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
		        $days_data[] = $res;
		    }

		    if (count($days_data) > 0) {
		    	$days_id_list = "(";
				foreach ($days_data as $key => $value) {
					if ($key > 0) {
						$days_id_list .= ",";
					}
					$days_id_list .= $value['day_id'];
				}
				$days_id_list .= ")";

				if (!(isset($daysFlag))) {
					return self::get_presentations($id,$days_id_list,$days_data);	
				}
				else if (isset($daysFlag) && $daysFlag==TRUE) {
					return $days_data;
				}
		    }
		    return $days_data;
		}
		else {
			
			return $days_data;
		    // return self::get_presentations($id,array());
		}
	}

	function get_presentations($id,$ids,$days_data){
		$presentations = array();

		$query = "select
						activities_id_fk,
						presentation_id,
						day_id_fk,
						event_day_str,
						presentation_title,
						presentation_author,
						presentation_url,
						date_added,
						date_last_updated
					from activities_presentations 
					where
						activities_id_fk = $id and
						day_id_fk in $ids
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
		        $presentations[] = $res;
		    }
		  	return $presentations;
		}
		else {
		    return array();
		}
	}


	function add_days($activity_id_fk,$eventDates,$eventDayTitles){

		$values_query = "";
		for ($i=0;$i<count($eventDates);$i++) {
			if ($i > 0) {
				$values_query .= ",";
			}
			$values_query .= " (".$activity_id_fk.", '".$eventDayTitles[$i]."', '".$eventDates[$i]."') ";	
		}

		$query = "insert into day_of_activities
						(activities_id_fk,
						event_day,
						event_date)
					values ".$values_query.";";

		$insertResult = mysql_query($query);

        if (!$insertResult) {
            return NULL;
        }
        
		return intval(mysql_insert_id());
	}
}

?>