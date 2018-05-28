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

if (isset($_POST['documentationform-submit'])) {
  
	$activity_id_fk = NULL;
    if (isset($_POST['documentationFile-activityidfk']) && !(empty($_POST['documentationFile-activityidfk']))) {
        $activity_id_fk = intval(mysql_escape_string(trim(strip_tags($_POST['documentationFile-activityidfk']))));
    }

    $href = "";
    if (isset($_POST['documentationFile-hreftitle']) && !(empty($_POST['documentationFile-hreftitle']))) {
        $href = mysql_escape_string(trim(strip_tags($_POST['documentationFile-hreftitle'])));
    }
    
    $u = new Upload();

    $curr_file_id = 'documentationfile';            
    $programFileName = basename($_FILES[$curr_file_id]["name"]);
    $tmp_name = $_FILES[$curr_file_id]["tmp_name"];

    if ($tmp_name=="" || empty($tmp_name) || $tmp_name===NULL) {
        print(json_encode(array('success'=>false,
                                'status'=>'nofile')));
        exit(); 
    }

    $newfilename = time().'-'.replaceAll($programFileName,FALSE);
    $newfilesize = filesize($tmp_name);

    $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
    $db_filesize = $newfilesize;
    $db_filetype = mysql_escape_string(trim(strip_tags($_FILES[$curr_file_id]['type'])));
    
    $programFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE,$href);
    $db_mainfilename_arr = explode('../../../',$programFileUpload['path']);
    $curr_file_url = $db_mainfilename_arr[1];	

    if ( $programFileUpload['status']=='uploadReady') {
        if ( move_uploaded_file($tmp_name, $programFileUpload['path']) ) {

            $insertQuery = "update activities 
                            set
                                documentation_url = '".$curr_file_url."'
                            where id=".$activity_id_fk;

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
        $lastError = $programFileUpload['status'];
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
