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
// $contentSection = 'GIS';

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

if (isset($_POST['wplan-submit'])) {

    $lastError = '';

    if (isset($_POST['wplan-year']) && !(empty($_POST['wplan-year']))) {
        $year = explode('string:', $_POST['wplan-year'])[1];
        $year = mysql_escape_string(trim(strip_tags($year)));
    }

    if (isset($_POST['wplan-filetitle']) && !(empty($_POST['wplan-filetitle']))) {
        $title = mysql_escape_string(trim(strip_tags($_POST['wplan-filetitle'])));
    }

    if (isset($_POST['wplan-type']) && !(empty($_POST['wplan-type'])) ) {
        $contentSection = replaceAll(mysql_escape_string(trim(strip_tags($_POST['wplan-type']))),FALSE);
    }

    $currFile = array('year_covered'=>$year,    
                      'title'=>$title,
                      'file_url'=>'',
                      'is_specific_wp'=>1);

    if ($contentSection=='Work-Plan') {
        $currFile['is_specific_wp'] = 0;
    }   

    if (isset($_FILES['wplan-fileinput'])) {
        $wplan_filename = basename($_FILES["wplan-fileinput"]["name"]);
        $file_tmp_name = $_FILES["wplan-fileinput"]["tmp_name"];   

        if ($file_tmp_name=="" || empty($file_tmp_name) || $file_tmp_name===NULL) {
            print(json_encode(array('success'=>false,
                                    'status'=>'nofile')));
            exit(); 
        }

        $newfilename = replaceAll($wplan_filename,FALSE);
        $newfilesize = filesize($file_tmp_name);
        $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
        $db_filesize = $newfilesize;
        $db_filetype = mysql_escape_string(trim(strip_tags($_FILES["wplan-fileinput"]['type'])));

        $u = new Upload();
        $wplanFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE);

        $db_mainfilename_arr = explode('../../../',$wplanFileUpload['path']);
        $currFile['file_url'] = '../'.$db_mainfilename_arr[1];

        if ( $wplanFileUpload['status']=='uploadReady') {

            if ( move_uploaded_file($file_tmp_name, $wplanFileUpload['path']) ) {

                $insertQuery = "insert into resources_work_plan
                                    (title,
                                    year_covered,
                                    file_url,
                                    is_specific_wp)
                                values
                                    ('".$currFile['title']."',
                                    '".$currFile['year_covered']."',
                                    '".$currFile['file_url']."',
                                    ".$currFile['is_specific_wp'].")";

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
            $lastError = $wplanFileUpload['status'];
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
