<?php 
require_once('Activities.php');
require_once('../../classes/Upload.php');
require_once('../../classes/mysql_connect.php');

function replaceAll($text,$lower) { 
	if ($lower==TRUE) {
		$text = strtolower(htmlentities($text)); 	
	}
    $text = str_replace(get_html_translation_table(), "-", $text);
    $text = str_replace(" ", "-", $text);
    $text = preg_replace("/[-]+/i", "-", $text);
    return $text;
}

$return_data = NULL;
$uploadType = 'document';
$contentSection = 'Activities';

/* ------------------------------------------
 * Relative Path Notes 
 * ------------------------------------------
 * 
 * Use the following: 
 *
 * During upload 				'../../..' 
 * When saving to DB 			'../' 
 * When displaying to the UI 	Append '../' 
 * ------------------------------------------
 **/

$lastError = "";
$errorCount = 0;

if (isset($_POST['newactivity-submit'])) {

	$title = "";
	$href = "";
    if (isset($_POST['newactivity-title']) && !(empty($_POST['newactivity-title']))) {
        $title = mysql_escape_string(trim(strip_tags($_POST['newactivity-title'])));
        $href = replaceAll($title,FALSE); 
    }

    $start_date = "";
    $end_date = "";
    if (isset($_POST['newactivity-startdate']) && !(empty($_POST['newactivity-startdate']))) {
        $start_date = mysql_escape_string(trim(strip_tags($_POST['newactivity-startdate'])));
    }

    if (isset($_POST['newactivity-enddate']) && !(empty($_POST['newactivity-enddate']))) {
        $end_date = mysql_escape_string(trim(strip_tags($_POST['newactivity-enddate'])));
    }

    $venue = "";
    if (isset($_POST['newactivity-venue']) && !(empty($_POST['newactivity-venue']))) {
        $venue = mysql_escape_string(trim(strip_tags($_POST['newactivity-venue'])));
    }

    $fbPhotoAlbum_url = '';
    $withOfflineGallery = false;
    if (isset($_POST['newactivity-fb_photoAlbum_url']) && !(empty($_POST['newactivity-fb_photoAlbum_url']))) {
    	$fbPhotoAlbum_url = mysql_escape_string(trim(strip_tags($_POST['newactivity-fb_photoAlbum_url'])));	
    }

    $filestocheck = "";
    $fileIdsArr = array();
    if (isset($_POST['newactivity-filestocheck']) && !(empty($_POST['newactivity-filestocheck']))) {
    	$filestocheck = mysql_escape_string(trim(strip_tags($_POST['newactivity-filestocheck'])));	
    	if ($filestocheck!="") {
    		$fileIdsArr = explode(",", $filestocheck);
    	}
    }

    $numDays = 0;
	if (isset($_POST['newactivity-numofeventdays']) && !(empty($_POST['newactivity-numofeventdays']))) {
    	$numDays = intval(mysql_escape_string(trim(strip_tags($_POST['newactivity-numofeventdays']))));	
    }    

    $eventDates = array();
    if (isset($_POST['datesString']) && !(empty($_POST['datesString']))) {
        $datesString = mysql_escape_string(trim(strip_tags($_POST['datesString']))); 
        $eventDates = explode(',', $datesString);
    }    

    $eventDayTitles = array();
    if (isset($_POST['titlesString']) && !(empty($_POST['titlesString']))) {
        $titlesString = mysql_escape_string(trim(strip_tags($_POST['titlesString']))); 
        $eventDayTitles = explode('===', $titlesString);
    } 
    
    $program_file_url = "";
    $documentation_file_url = "";
    $coverphoto_file_url = "";
	$activity_id_fk = NULL;
	
    $currFile = array('title'=>$title,    
	                  'href'=>$href,
	                  'activity_start_date'=>$start_date,
	                  'activity_end_date'=>$end_date,
	                  'activity_venue'=>$venue,
	                  'fbPhotoAlbum_url'=>$fbPhotoAlbum_url,
	                  'coverphoto_url'=>$coverphoto_file_url,
	                  'documentation_url'=>$documentation_file_url,
	                  'program_url'=>$program_file_url,
	                  'numDays'=>$numDays);
    
    if (count($fileIdsArr) > 0) {
        
        $u = new Upload();

        // Start of loop for processing file inputs
    	for ($i=0;$i<count($fileIdsArr);$i++) {
    		$curr_file_id = $fileIdsArr[$i];
			$real_idx = explode("-",$curr_file_id);

    		$activityFileName = basename($_FILES[$curr_file_id]["name"]);
		    $tmp_name = $_FILES[$curr_file_id]["tmp_name"];
		    if ($tmp_name=="" || empty($tmp_name) || $tmp_name===NULL) {
		        print(json_encode(array('success'=>false,
		                                'status'=>'nofile')));
		        exit(); 
		    }
		    $newfilename = time().'-'.replaceAll($activityFileName,FALSE);
		    $newfilesize = filesize($tmp_name);

		    $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
		    $db_filesize = $newfilesize;
		    $db_filetype = mysql_escape_string(trim(strip_tags($_FILES[$curr_file_id]['type'])));
		    
		    $activityFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE,$href);
		    $db_mainfilename_arr = explode('../../../',$activityFileUpload['path']);
			$file_url = $db_mainfilename_arr[1];	

			if ( $activityFileUpload['status']=='uploadReady') {
		        if ( move_uploaded_file($tmp_name, $activityFileUpload['path']) ) {

		           	switch ($real_idx[1]) {
				    	case '0': // PROGRAM				    		
				    		$currFile['program_url'] = $file_url;						    
				    		break;

				    	case '1':
				    		$currFile['documentation_url'] = $file_url;						    
				    		break;

				    	case '2':
				    		$currFile['coverphoto_url'] = $file_url;
				    		break;
				    }
		        }
		        else {
		        	$errorCount++;
		        	$lastError = "uploaderror";
		        }
		    }
		    else {
		    	$errorCount++;
		    	$lastError = $activityFileUpload['status'];
		    }
    	}
        // End of loop for file inputs;
    }

    if ($currFile['coverphoto_url']=="") {
        $currFile['coverphoto_url'] = 'images/_activities/cp/default-coverphoto.png';
    }

    $insertQuery = "insert into activities
                        (title,
                        href,
                        activity_start_date,
                        activity_end_date,
                        activity_venue,
                        coverphoto_url,
                        withOfflineGallery,
                        fbPhotoAlbum_url,
                        program_url,
                        documentation_url)
                    values
                    	('".$currFile['title']."',
                        '".$currFile['href']."',
                        '".$currFile['activity_start_date']."',
                        '".$currFile['activity_end_date']."',
                        '".$currFile['activity_venue']."',
                        '".$currFile['coverphoto_url']."',
                        FALSE,
                        '".$currFile['fbPhotoAlbum_url']."',
                        '".$currFile['program_url']."',
                        '".$currFile['documentation_url']."')";

    $inserted = mysql_query($insertQuery);
    $activity_id_fk = intval(mysql_insert_id());

    if (!$inserted) {
    	$errorCount++;
        print(json_encode(array('success'=>false,
                                'status'=>'sqlerror-'.mysql_error())));    
    }
    else {
    	if ($errorCount > 0) {
			print(json_encode(array('success'=>false,
		                            'status'=>$lastError)));		
    	}
    	else {
            // add days
            $activity = new Activities();
            $daysAdded = $activity->add_days($activity_id_fk,$eventDates,$eventDayTitles);

            if ($daysAdded==NULL) {
                print(json_encode(array('success'=>false,
                                        'status'=>'error in adding days')));               
            }
            else {
                print(json_encode(array('success'=>true,
                                        'status'=>'fileuploaded')));
            }
    	}
    }
    
    // End: Insert to databse
    exit();
	
}

exit();

?>
