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

if (isset($_POST['presfilescontent-submit'])) {
  
	$activity_id_fk = NULL;
    if (isset($_POST['presfiles-activityidfk']) && !(empty($_POST['presfiles-activityidfk']))) {
        $activity_id_fk = intval(mysql_escape_string(trim(strip_tags($_POST['presfiles-activityidfk']))));
    }

    $href = "";
    if (isset($_POST['presfiles-hreftitle']) && !(empty($_POST['presfiles-hreftitle']))) {
        $href = mysql_escape_string(trim(strip_tags($_POST['presfiles-hreftitle'])));
    }

    $numfiles = 0;
    if (isset($_POST['presfiles-count']) && !(empty($_POST['presfiles-count']))) {
        $numfiles = intval(mysql_escape_string(trim(strip_tags($_POST['presfiles-count']))));
    }

    $event_day = "";
    $event_day_id_fk = NULL;
    if (isset($_POST['presfiles-daystr']) && !(empty($_POST['presfiles-daystr']))) {
        $event_day = mysql_escape_string(trim(strip_tags($_POST['presfiles-daystr'])));
    }
    if (isset($_POST['presfiles-dayidfk']) && !(empty($_POST['presfiles-dayidfk']))) {
        $event_day_id_fk = intval(mysql_escape_string(trim(strip_tags($_POST['presfiles-dayidfk']))));
    }

    if ($numfiles > 0) {
        
        $u = new Upload();

        // Start of loop for processing file inputs
    	for ($i=0;$i<$numfiles;$i++) {

            $presentationtitle = "";
            if (isset($_POST['presentationtitle-'.$i]) && !(empty($_POST['presentationtitle-'.$i]))) {
                $presentationtitle = mysql_escape_string(trim(strip_tags($_POST['presentationtitle-'.$i])));
            }

            $presentationauthor = "";
            if (isset($_POST['presentationauthor-'.$i]) && !(empty($_POST['presentationauthor-'.$i]))) {
                $presentationauthor = mysql_escape_string(trim(strip_tags($_POST['presentationauthor-'.$i])));
            }

            $currFile = array('activity_id_fk'=>$activity_id_fk,
                              'href'=>$href,
                              'event_day'=>$event_day,
                              'event_day_id_fk'=>$event_day_id_fk,
                              'numfiles'=>$numfiles,
                              'presentation_title'=>$presentationtitle,
                              'presentation_author'=>$presentationauthor,
                              'presentation_url'=>'');

    		$curr_file_id = 'presentationfile-'.$i;            

    		$presentationFileName = basename($_FILES[$curr_file_id]["name"]);
		    $tmp_name = $_FILES[$curr_file_id]["tmp_name"];

		    if ($tmp_name=="" || empty($tmp_name) || $tmp_name===NULL) {
		        print(json_encode(array('success'=>false,
		                                'status'=>'nofile-'.$i)));
		        exit(); 
		    }

		    $newfilename = time().'-'.replaceAll($presentationFileName,FALSE);
		    $newfilesize = filesize($tmp_name);

		    $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
		    $db_filesize = $newfilesize;
		    $db_filetype = mysql_escape_string(trim(strip_tags($_FILES[$curr_file_id]['type'])));
		    
		    $activityPresentationFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE,$href);
		    $db_mainfilename_arr = explode('../../../',$activityPresentationFileUpload['path']);
			$currFile['presentation_url'] = $db_mainfilename_arr[1];	

			if ( $activityPresentationFileUpload['status']=='uploadReady') {
		        if ( move_uploaded_file($tmp_name, $activityPresentationFileUpload['path']) ) {

                    $insertQuery = "insert into activities_presentations
                                        (activities_id_fk,
                                        day_id_fk,
                                        event_day_str,
                                        presentation_title,
                                        presentation_author,
                                        presentation_url)
                                    values
                                        (".$currFile['activity_id_fk'].",
                                        ".$currFile['event_day_id_fk'].",
                                        '".$currFile['event_day']."',
                                        '".$currFile['presentation_title']."',
                                        '".$currFile['presentation_author']."',
                                        '".$currFile['presentation_url']."');";

                    $inserted = mysql_query($insertQuery);

                    if (!$inserted) {
                        $errorCount++;
                        $lastError = 'sqlerror-'.mysql_error();
                    }
                    
		        }
		        else {
		        	$errorCount++;
		        	$lastError = 'uploadError';
		        }
		    }
		    else {
		    	$errorCount++;
		    	$lastError = $activityPresentationFileUpload['status'];
		    }

    	}
        // End of loop for file inputs;
    }

    if ($errorCount > 0) {
        print(json_encode(array('success'=>false,
                                'status'=>$lastError)));        
    }
    else {
        print(json_encode(array('success'=>true,
                                'status'=>'fileuploaded')));
    }

    exit();
	
}

exit();

?>
