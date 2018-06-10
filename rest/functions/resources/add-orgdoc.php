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
$contentSection = 'OrgDoc';

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

if (isset($_POST['orgdoc-submit'])) {

    $lastError = '';

    $folder = "";
    $folder_id = "";
    if (isset($_POST['orgdoc-usefolder']) && !(empty($_POST['orgdoc-usefolder']))) {
        $folder = mysql_escape_string(trim(strip_tags($_POST['orgdoc-usefolder'])));
        $folder_id = replaceAll($folder,FALSE);
        if ($folder=='/') {
            $folder = '';
            $folder_id = '';
        }
    }


    $title = "";
    $title_id = "";
    if (isset($_POST['orgdoc-filetitle']) && !(empty($_POST['orgdoc-filetitle']))) {
        $title = mysql_escape_string(trim(strip_tags($_POST['orgdoc-filetitle'])));
        $title_id = replaceAll($title,FALSE);
    }

    $currFile = array('folder'=>$folder,    
                      'folder_id'=>$folder_id,    
                      'title'=>$title,
                      'title_id'=>$title_id,
                      'file_url'=>'');
    
    if (isset($_FILES['orgdoc-fileinput'])) {
        $orgdoc_filename = basename($_FILES["orgdoc-fileinput"]["name"]);
        $file_tmp_name = $_FILES["orgdoc-fileinput"]["tmp_name"];   

        if ($file_tmp_name=="" || empty($file_tmp_name) || $file_tmp_name===NULL) {
            print(json_encode(array('success'=>false,
                                    'status'=>'nofile')));
            exit(); 
        }

        $newfilename = replaceAll($orgdoc_filename,FALSE);
        $newfilesize = filesize($file_tmp_name);
        $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
        $db_filesize = $newfilesize;
        $db_filetype = mysql_escape_string(trim(strip_tags($_FILES["orgdoc-fileinput"]['type'])));

        $u = new Upload();
        $orgdocFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE);

        $db_mainfilename_arr = explode('../../../',$orgdocFileUpload['path']);
        $currFile['file_url'] = '../'.$db_mainfilename_arr[1];

        if ( $orgdocFileUpload['status']=='uploadReady') {

            if ( move_uploaded_file($file_tmp_name, $orgdocFileUpload['path']) ) {

                $insertQuery = "insert into resources_organizational_documents
                                    (file_title,
                                    file_id,
                                    folder_name,
                                    folder_id,
                                    file_url)
                                values
                                    ('".$currFile['title']."',
                                    '".$currFile['title_id']."',
                                    '".$currFile['folder']."',
                                    '".$currFile['folder_id']."',
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
            $lastError = $orgdocFileUpload['status'];
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
