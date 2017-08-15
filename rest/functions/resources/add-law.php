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
$contentSection = 'Laws';

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

if (isset($_POST['law-submit'])) {

    $lastError = '';

    $category = '';
    if (isset($_POST['law-category']) && !(empty($_POST['law-category']))) {
        $category = explode('string:', $_POST['law-category'])[1];
        $category = mysql_escape_string(trim(strip_tags($category)));
    }

    $level = '';
    if ($category=='Local Tax Codes') {
        if (isset($_POST['law-level']) && !(empty($_POST['law-level']))) {
            $level = explode('string:', $_POST['law-level'])[1];
            $level = mysql_escape_string(trim(strip_tags($level)));
        }        
    }

    $title = '';
    if (isset($_POST['law-filetitle']) && !(empty($_POST['law-filetitle']))) {
        $title = mysql_escape_string(trim(strip_tags($_POST['law-filetitle'])));
    }

    $description = '';
    if (isset($_POST['law-description']) && !(empty($_POST['law-description']))) {
        $description = mysql_escape_string(trim(strip_tags($_POST['law-description'])));
    }

    $currFile = array('category'=>$category,    
                      'level'=>$level,
                      'title'=>$title,
                      'description'=>$description,
                      'file_url'=>'');


    if (isset($_FILES['law-fileinput'])) {
        $law_filename = basename($_FILES["law-fileinput"]["name"]);
        $file_tmp_name = $_FILES["law-fileinput"]["tmp_name"];   

        if ($file_tmp_name=="" || empty($file_tmp_name) || $file_tmp_name===NULL) {
            print(json_encode(array('success'=>false,
                                    'status'=>'nofile')));
            exit(); 
        }

        $newfilename = replaceAll($law_filename,FALSE);
        $newfilesize = filesize($file_tmp_name);
        $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
        $db_filesize = $newfilesize;
        $db_filetype = mysql_escape_string(trim(strip_tags($_FILES["law-fileinput"]['type'])));

        $u = new Upload();
        $lawFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE);

        $db_mainfilename_arr = explode('../../../',$lawFileUpload['path']);
        $currFile['file_url'] = $db_mainfilename_arr[1];
        if ($category==='Local Tax Codes') {
            $currFile['file_url'] = '../'.$currFile['file_url'];
        }        

        if ( $lawFileUpload['status']=='uploadReady') {

            if ( move_uploaded_file($file_tmp_name, $lawFileUpload['path']) ) {

                $insertQuery = "insert into resources_laws_and_legal_issuances
                                    (category,
                                    level,
                                    title,
                                    description,
                                    file_url)
                                values
                                    ('".$currFile['category']."',
                                    '".$currFile['level']."',
                                    '".$currFile['title']."',
                                    '".$currFile['description']."',
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
            $lastError = $lawFileUpload['status'];
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
