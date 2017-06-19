<?php
include_once('../classes/Upload.php');
include_once('../classes/mysql_connect.php');

function replaceAll($text) { 
    $text = strtolower(htmlentities($text)); 
    $text = str_replace(get_html_translation_table(), "-", $text);
    $text = str_replace(" ", "-", $text);
    $text = preg_replace("/[-]+/i", "-", $text);
    return $text;
}

if (isset($_POST['submitMedia'])) {
    $uploadType = $_POST['uploadType'];
    $contentSection = $_POST['contentSection'];
    $uploadedBy = $_POST['uploadedBy'];
    $newsfk = $_POST['newsfk'];

    $filename = basename($_FILES["fileToUpload"]["name"]);
    $tmp_name = $_FILES["fileToUpload"]["tmp_name"];
    if ($tmp_name=="" || empty($tmp_name) || $tmp_name===NULL) {
        print(json_encode(array('success'=>false,
                                'status'=>'nofile')));
        exit(); 
    }
    $newfilename = time().'-'.replaceAll($filename);
    $newfilesize = filesize($tmp_name);

    $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
    $db_filesize = $newfilesize;
    $db_filetype = mysql_escape_string(trim(strip_tags($_FILES["fileToUpload"]['type'])));
    $db_contentSection = mysql_escape_string(trim(strip_tags($contentSection)));
    $db_uploadedBy = mysql_escape_string(trim(strip_tags($uploadedBy)));
    $db_newsfk = mysql_escape_string(trim(strip_tags($newsfk)));

    if ($uploadType=='picture'){

        if ($newfilesize > 500000) {
            print(json_encode(array('status'=>'toolarge','success'=>false)));
            exit();
        }
        
        $u = new Upload();
        $upload = $u->createFilePath($uploadType,$contentSection,$newfilename);

        if ( $upload['status']=='uploadReady') {
            if ( move_uploaded_file($tmp_name, $upload['path']) ) {
                // print(json_encode(array('success'=>true,
                //                         'filepath'=>stripcslashes($upload['path']))));

                // Insert to database here
                $db_folderdestination = mysql_escape_string(trim(strip_tags($upload['folderdestination'])));
                $insertImg = "insert into articleimages
                                    (newsfk,
                                    filename,
                                    folderdestination,
                                    contentSection,
                                    uploadedBy)
                                values
                                    ($db_newsfk,
                                    '$db_filename',
                                    '$db_folderdestination',
                                    '$db_contentSection',
                                    '$db_uploadedBy')";

                $inserted = mysql_query($insertImg);
                if (!$inserted) {
                    print(json_encode(array('success'=>false,
                                            'error'=>'database',
                                            'status'=>'uploaderror',
                                            'mysqlerror'=>mysql_error(),
                                            'query'=>$insertImg)));
                    exit();
                }

                print(json_encode(array('success'=>true,
                                        'status'=>'fileuploaded',
                                        'filepath'=>stripcslashes($upload['path']),
                                        'query'=>$insertImg)));
                // End: Insert to databse
                exit();
            }
            else {
                print(json_encode(array('success'=>false,
                                        'status'=>'uploaderror',
                                        'asdfasd'=>'asdfasd')));
                exit(); 
            }
        }
        else {
            print(json_encode(array('success'=>false,
                                    'status'=>$upload['status'],
                                    'filepath'=>stripcslashes($upload['path']))));
            exit(); 
        }
    } 
}


?>