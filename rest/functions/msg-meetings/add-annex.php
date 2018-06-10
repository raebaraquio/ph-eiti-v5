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

    // $mtgid = NULL;
    // if ($_POST['newsmg-mtgid']!=NULL && !(empty($_POST['newsmg-mtgid'])) ) {
        $mtgid = intval(mysql_escape_string(trim(strip_tags($_POST['newmsg-mtgid']))));
    // }

    if ($mtgid==NULL) {
        print(json_encode(array('success'=>false,
                                'status'=>'noid '.$mtgid)));
        exit();
    }

    $with_annex = 0;
    if (isset($_POST['newmsg-withannex']) && !(empty($_POST['newmsg-withannex']))) {
        $with_annex = intval(mysql_escape_string(trim(strip_tags($_POST['newmsg-withannex']))));
    }

    $numAnnex = 0;
    if (isset($_POST['newmsg-numannex']) && !(empty($_POST['newmsg-numannex']))) {
        $numAnnex = intval(mysql_escape_string(trim(strip_tags($_POST['newmsg-numannex']))));
    }

    $currFile = array('with_annex'=>$with_annex);

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
    
    if ($errorCount==0) {
        print(json_encode(array('success'=>true,
                                'status'=>'fileuploaded')));
    }
    else {
        print(json_encode(array('success'=>false,
                                'status'=>$lastError)));
    } 
    
    exit();

}


?>
