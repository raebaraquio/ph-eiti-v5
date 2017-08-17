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

    $gisfiles = array();    
    $lastError = '';

    $mtg_title = "";
    if (isset($_POST['newmsg-msgtitle']) && !(empty($_POST['newmsg-msgtitle']))) {
        $mtg_title = mysql_escape_string(trim(strip_tags($_POST['newmsg-msgtitle'])));
    }

    $mtg_date = "";
    if (isset($_POST['newmsg-usedate']) && !(empty($_POST['newmsg-usedate']))) {
        $mtg_date = mysql_escape_string(trim(strip_tags($_POST['newmsg-usedate'])));
    }

    $mtg_time = "";
    if (isset($_POST['newmsg-time']) && !(empty($_POST['newmsg-time']))) {
        $mtg_time = mysql_escape_string(trim(strip_tags($_POST['newmsg-time'])));
    }

    $mtg_venue = "";
    if (isset($_POST['newmsg-venue']) && !(empty($_POST['newmsg-venue']))) {
        $mtg_venue = mysql_escape_string(trim(strip_tags($_POST['newmsg-venue'])));
    }

    $with_annex = 0;
    if (isset($_POST['newmsg-withannex']) && !(empty($_POST['newmsg-withannex']))) {
        $with_annex = intval(mysql_escape_string(trim(strip_tags($_POST['newmsg-withannex']))));
    }

    $numAnnex = 0;
    if (isset($_POST['newmsg-numannex']) && !(empty($_POST['newmsg-numannex']))) {
        $numAnnex = intval(mysql_escape_string(trim(strip_tags($_POST['newmsg-numannex']))));
    }

    $currFile = array('mtg_title'=>$mtg_title,
                        'mtg_date'=>$mtg_date,
                        'mtg_time'=>$mtg_time,
                        'mtg_venue'=>$mtg_venue,
                        'minutes_url'=>'',
                        'with_annex'=>$with_annex);

    $mtgid = null;
    
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

                $insertQuery = "insert into msg_meetings
                                    (mtg_title,
                                    mtg_date,
                                    mtg_time,
                                    mtg_venue,
                                    minutes_url,
                                    with_annex)
                                values
                                    ('".$currFile['mtg_title']."',
                                    '".$currFile['mtg_date']."',
                                    '".$currFile['mtg_time']."',
                                    '".$currFile['mtg_venue']."',
                                    '".$currFile['minutes_url']."',
                                    ".$currFile['with_annex'].")";

                $inserted = mysql_query($insertQuery);

                if (!$inserted) {
                    $errorCount++;
                    $lastError = 'sqlerror-'.mysql_error();
                }

                $mtgid = mysql_insert_id();

                //// Check Annexes
                if ($currFile['with_annex']==1) {

                        for ($i=0;$i<$numAnnex;$i++) {

                            if (isset($_POST['newmsg-filetitleannex-'.$i]) && !(empty($_POST['newmsg-filetitleannex-'.$i]))) {

                                // $year = explode('string:', $_POST['year-'.$i])[1];
                                // $year = mysql_escape_string(trim(strip_tags($year)));
                                // $folder_name = $year;
                                // $folder_id = $year;

                                $title = mysql_escape_string(trim(strip_tags($_POST['newmsg-filetitleannex-'.$i])));

                                $annexFile = array('title'=>$title,
                                                   'mtgid_fk'=>$mtgid,
                                                   'file_url'=>'');

                                if (isset($_FILES['newmsg-fileinputannex-'.$i])) {
                                    $annex_filename = basename($_FILES["newmsg-fileinputannex-".$i]["name"]);
                                    $file_tmp_name = $_FILES["newmsg-fileinputannex-".$i]["tmp_name"];   

                                    if ($file_tmp_name=="" || empty($file_tmp_name) || $file_tmp_name===NULL) {
                                        print(json_encode(array('success'=>false,
                                                                'status'=>'nofile')));
                                        exit(); 
                                    }

                                    $newfilename = replaceAll($annex_filename,FALSE);
                                    $newfilesize = filesize($file_tmp_name);
                                    $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
                                    $db_filesize = $newfilesize;
                                    $db_filetype = mysql_escape_string(trim(strip_tags($_FILES["newmsg-fileinputannex-".$i]['type'])));

                                    $u = new Upload();
                                    $annexFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE);

                                    $db_mainfilename_arr = explode('../../../',$annexFileUpload['path']);
                                    $annexFile['file_url'] = $db_mainfilename_arr[1];

                                    if ( $annexFileUpload['status']=='uploadReady') {

                                        if ( move_uploaded_file($file_tmp_name, $annexFileUpload['path']) ) {

                                            $insertQuery = "insert into msg_meetings_file_annexes
                                                                (mtgid_fk,
                                                                title,
                                                                file_url)
                                                            values
                                                                (".$annexFile['mtgid_fk'].",
                                                                '".$annexFile['title']."',
                                                                '".$annexFile['file_url']."')";

                                            $inserted = mysql_query($insertQuery);

                                            if (!$inserted) {
                                                $errorCount++;
                                                $lastError = $annexFileUpload['status'];
                                            }

                                        }
                                        else {
                                            $errorCount++;
                                            $lastError = $annexFileUpload['status'];
                                        }
                                    }
                                    else {
                                        $errorCount++;
                                        $lastError = $annexFileUpload['status'];
                                    }
                                }

                            }

                        }
                }
                //// End of Checking Annexes
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
