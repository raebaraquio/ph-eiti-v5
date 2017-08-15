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
$contentSection = 'GIS';

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

if (isset($_POST['gis-submit'])) {

    $gisfiles = array();    
    $lastError = '';

    for ($i=0;$i<$numAllowed;$i++) {

        if (isset($_POST['year-'.$i]) && !(empty($_POST['year-'.$i]))) {

            $year = explode('string:', $_POST['year-'.$i])[1];
            $year = mysql_escape_string(trim(strip_tags($year)));
            $folder_name = $year;
            $folder_id = $year;
            $title = mysql_escape_string(trim(strip_tags($_POST['filetitle-'.$i])));

            $currFile = array('year'=>$year,
                              'folder_name'=>$folder_name,
                              'folder_id'=>$folder_id,
                              'title'=>$title,
                              'title_id'=>$title,
                              'file_url'=>'');

            if (isset($_FILES['fileinput-'.$i])) {
                $gis_filename = basename($_FILES["fileinput-".$i]["name"]);
                $file_tmp_name = $_FILES["fileinput-".$i]["tmp_name"];   

                if ($file_tmp_name=="" || empty($file_tmp_name) || $file_tmp_name===NULL) {
                    print(json_encode(array('success'=>false,
                                            'status'=>'nofile')));
                    exit(); 
                }

                $newfilename = replaceAll($gis_filename,FALSE);
                $newfilesize = filesize($file_tmp_name);
                $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
                $db_filesize = $newfilesize;
                $db_filetype = mysql_escape_string(trim(strip_tags($_FILES["fileinput-".$i]['type'])));

                $u = new Upload();
                $gisFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE);

                $db_mainfilename_arr = explode('../../../',$gisFileUpload['path']);
                $currFile['file_url'] = $db_mainfilename_arr[1];

                if ( $gisFileUpload['status']=='uploadReady') {

                    if ( move_uploaded_file($file_tmp_name, $gisFileUpload['path']) ) {

                        $insertQuery = "insert into resources_gis
                                            (year,
                                            folder_name,
                                            folder_id,
                                            title,
                                            title_id,
                                            file_url)
                                        values
                                            ('".$currFile['year']."',
                                            '".$currFile['folder_name']."',
                                            '".$currFile['folder_id']."',
                                            '".$currFile['title']."',
                                            '".$currFile['title_id']."',
                                            '".$currFile['file_url']."')";

                        $inserted = mysql_query($insertQuery);

                        if (!$inserted) {
                            $errorCount++;
                            $lastError = $gisFileUpload['status'];
                        }

                    }
                    else {
                        $errorCount++;
                        $lastError = $gisFileUpload['status'];
                    }
                }
                else {
                    $errorCount++;
                    $lastError = $gisFileUpload['status'];
                }
            }

        }

    }

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
