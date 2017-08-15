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
$contentSection = 'Brochure';

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

if (isset($_POST['brochure-submit'])) {

    $year = "";
    if (isset($_POST['brochure-year']) && !(empty($_POST['brochure-year']))) {
        $year = explode('string:', $_POST['brochure-year'])[1];
        $year = mysql_escape_string(trim(strip_tags($year)));
    }

    $title = '';
    $title_id = '';
    if (isset($_POST['brochure-filetitle']) && !(empty($_POST['brochure-filetitle']))) {
        $title = mysql_escape_string(trim(strip_tags($_POST['brochure-filetitle'])));
        $title_id = replaceAll($title,FALSE);
    }

    $eventname = '';
    if (isset($_POST['brochure-eventname']) && !(empty($_POST['brochure-eventname']))) {
        $eventname = mysql_escape_string(trim(strip_tags($_POST['brochure-eventname'])));
    }

    $currFile = array('year'=>$year,    
                      'title'=>$title,
                      'title_id'=>$title_id,
                      'eventname'=>$eventname,
                      'card_icon_url'=>'',
                      'file_url'=>'');
	
	$thumbdata = $_POST['brochure-thumbdata'];
	
	/* Converting the thumbnail data (base64 format) into an image */

	list($type, $thumbdata) = explode(';', $thumbdata);
	list(, $thumbdata)      = explode(',', $thumbdata);
	$thumbdata = base64_decode($thumbdata);

	/* Generate and upload the thumbnail image file to the server */
	
	$thumbfilename = $title_id.'-thumb.png';

	$u = new Upload();

    $thumbnailUpload = $u->createFilePath($uploadType,$contentSection,$thumbfilename,TRUE);
    $db_cardicon_arr = explode('../../../',$thumbnailUpload['path']);    
    $currFile['card_icon_url'] = $db_cardicon_arr[1];

    if ( $thumbnailUpload['status']=='uploadReady') {
    	file_put_contents($thumbnailUpload['path'], $thumbdata);
    }
    
	/* Main Brochure File */
	$brochurefilename = basename($_FILES["brochure-fileinput"]["name"]);
    $tmp_name = $_FILES["brochure-fileinput"]["tmp_name"];
    if ($tmp_name=="" || empty($tmp_name) || $tmp_name===NULL) {
        print(json_encode(array('success'=>false,
                                'status'=>'nofile')));
        exit(); 
    }
    $newfilename = time().'-'.replaceAll($brochurefilename,FALSE);
    $newfilesize = filesize($tmp_name);

    $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
    $db_filesize = $newfilesize;
    $db_filetype = mysql_escape_string(trim(strip_tags($_FILES["brochure-fileinput"]['type'])));
    
    $brochureFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE);

    $db_mainfilename_arr = explode('../../../',$brochureFileUpload['path']);
    $currFile['file_url'] = $db_mainfilename_arr[1];

    if ( $brochureFileUpload['status']=='uploadReady') {
        if ( move_uploaded_file($tmp_name, $brochureFileUpload['path']) ) {
           
            $insertQuery =  "insert into resources_brochures
                                    (title,
                                    title_id,
                                    year,
                                    file_url,
                                    event_name,
                                    cardicon_url)
                                values
                                    ('".$currFile['title']."',
                                    '".$currFile['title_id']."',
                                    '".$currFile['year']."',
                                    '".$currFile['file_url']."',
                                    '".$currFile['eventname']."',
                                    '".$currFile['card_icon_url']."')";

            $inserted = mysql_query($insertQuery);

            if (!$inserted) {
                print(json_encode(array('success'=>false,
                                        'error'=>'database',
                                        'status'=>'uploaderror',
                                        'mysqlerror'=>mysql_error(),
                                        'query'=>$insertQuery)));
                exit();
            }

            print(json_encode(array('success'=>true,
                                    'status'=>'fileuploaded',
                                    'filepath'=>stripcslashes($brochureFileUpload['path']),
                                    'query'=>$insertQuery)));
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
                                'status'=>$brochureFileUpload['status'],
                                'filepath'=>stripcslashes($brochureFileUpload['path']))));
        exit(); 
    }
}

exit();

?>
