<?php 
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
$contentSection = 'MSGMeeting';

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

$numAllowed = 5;
$errorCount = 0;

if (isset($_POST['newmsg-submit'])) {

    $lastError = '';

    $mtgid = NULL;
    if (isset($_POST['newsmg-mtgid'])) {
        $mtgid = intval(mysql_escape_string(trim(strip_tags($_POST['newmsg-mtgid']))));
    }

    if ($mtgid==NULL) {
        print(json_encode(array('success'=>false,
                                'status'=>'noid')));
        exit();
    }
    
    /// Start: minutes
    if (isset($_FILES['newmsg-minutesfile'])) {
        $mtgminutes_filename = basename($_FILES["newmsg-minutesfile"]["name"]);
        $file_tmp_name = $_FILES["newmsg-minutesfile"]["tmp_name"];   

        if ($file_tmp_name=="" || empty($file_tmp_name) || $file_tmp_name===NULL) {
            print(json_encode(array('success'=>false,
                                    'status'=>'nofile')));
            exit(); 
        }

        $newfilename = replaceAll($mtgminutes_filename,FALSE);
        $newfilesize = filesize($file_tmp_name);
        $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
        $db_filesize = $newfilesize;
        $db_filetype = mysql_escape_string(trim(strip_tags($_FILES["newmsg-minutesfile"]['type'])));

        $u = new Upload();
        $mtgMinutesFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE);

        $db_mainfilename_arr = explode('../../../',$mtgMinutesFileUpload['path']);
        $currFile['minutes_url'] = $db_mainfilename_arr[1];

        if ( $mtgMinutesFileUpload['status']=='uploadReady') {

            if ( move_uploaded_file($file_tmp_name, $mtgMinutesFileUpload['path']) ) {

                $insertQuery = "update msg_meetings
                                    set minutes_url = '".$currFile['minutes_url']."'
                                    where mtgid = ".$mtgid;

                $inserted = mysql_query($insertQuery);

                if (!$inserted) {
                    $errorCount++;
                    $lastError = 'sqlerror-'.mysql_error();
                }

            }
            else {
                $errorCount++;
                $lastError = 'folderError';
            }
        }
        else {
            $errorCount++;
            $lastError = $mtgMinutesFileUpload['status'];
        }

        if ($errorCount==0) {
            print(json_encode(array('success'=>true,
                                    'status'=>'fileuploaded')));
        }
        else {
            print(json_encode(array('success'=>false,
                                    'status'=>$lastError)));
        } 

    }
    else {
        print(json_encode(array('success'=>false,
                                'status'=>'nominutes')));
    }
    /// End: minutes


    exit();

}


?>
