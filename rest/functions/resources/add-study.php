<?php 
require_once('Resources.php');
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
$contentSection = 'Document';

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

if (isset($_POST['study-submit'])) {

    $lastError = '';

    if (isset($_POST['study-year']) && !(empty($_POST['study-year']))) {
        $year = explode('string:', $_POST['study-year'])[1];
        $year = mysql_escape_string(trim(strip_tags($year)));
    }

    if (isset($_POST['study-filetitle']) && !(empty($_POST['study-filetitle']))) {
        $title = mysql_escape_string(trim(strip_tags($_POST['study-filetitle'])));
        $title_id = replaceAll($title,FALSE);
    }

    if (isset($_POST['study-type']) && !(empty($_POST['study-type'])) ) {
        $contentSection = replaceAll(mysql_escape_string(trim(strip_tags($_POST['study-type']))),FALSE);
    }

    $currFile = array('year'=>$year,    
                      'title'=>$title,
                      'title_id'=>$title_id,
                      'file_url'=>'');


    if (isset($_FILES['study-fileinput'])) {
        $wplan_filename = basename($_FILES["study-fileinput"]["name"]);
        $file_tmp_name = $_FILES["study-fileinput"]["tmp_name"];   

        if ($file_tmp_name=="" || empty($file_tmp_name) || $file_tmp_name===NULL) {
            print(json_encode(array('success'=>false,
                                    'status'=>'nofile')));
            exit(); 
        }

        $newfilename = replaceAll($wplan_filename,FALSE);
        $newfilesize = filesize($file_tmp_name);
        $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
        $db_filesize = $newfilesize;
        $db_filetype = mysql_escape_string(trim(strip_tags($_FILES["study-fileinput"]['type'])));

        $u = new Upload();
        $studyFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE);

        $db_mainfilename_arr = explode('../../../',$studyFileUpload['path']);
        $currFile['file_url'] = $db_mainfilename_arr[1];

        if ( $studyFileUpload['status']=='uploadReady') {

            if ( move_uploaded_file($file_tmp_name, $studyFileUpload['path']) ) {

                $insertQuery = "insert into resources_studies
                                    (title,
                                    title_id,
                                    year,
                                    file_url)
                                values
                                    ('".$currFile['title']."',
                                    '".$currFile['title_id']."',
                                    '".$currFile['year']."',
                                    '".$currFile['file_url']."')";

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
            $lastError = $studyFileUpload['status'];
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

    exit();

}


?>
