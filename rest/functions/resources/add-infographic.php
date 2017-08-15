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
$contentSection = 'Infographic';

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

if (isset($_POST['info-submit'])) {

    $year = "";
    if (isset($_POST['info-year']) && !(empty($_POST['info-year']))) {
        $year = explode('string:', $_POST['info-year'])[1];
        $year = mysql_escape_string(trim(strip_tags($year)));
    }

    $title = '';
    $title_id = '';
    if (isset($_POST['info-filetitle']) && !(empty($_POST['info-filetitle']))) {
        $title = mysql_escape_string(trim(strip_tags($_POST['info-filetitle'])));
        $title_id = replaceAll($title,FALSE);
    }

    $eventname = '';
    if (isset($_POST['info-eventname']) && !(empty($_POST['info-eventname']))) {
        $eventname = mysql_escape_string(trim(strip_tags($_POST['info-eventname'])));
    }

    $newletter_issue = '';
    if (isset($_POST['info-newsletterissue']) && !(empty($_POST['info-newsletterissue']))) {
        $newletter_issue = mysql_escape_string(trim(strip_tags($_POST['info-newsletterissue'])));
    }

    $other_info = '';
    if (isset($_POST['info-otherinfo']) && !(empty($_POST['info-otherinfo']))) {
        $other_info = mysql_escape_string(trim(strip_tags($_POST['info-otherinfo'])));
    }

    $currFile = array('year'=>$year,    
                      'title'=>$title,
                      'title_id'=>$title_id,
                      'eventname'=>$eventname,
                      'newsletter_issue'=>$newletter_issue,
                      'other_info'=>$other_info,
                      'card_icon_url'=>'',
                      'file_url'=>'');
	
	$thumbdata = $_POST['info-thumbdata'];
	
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
	$infographicfilename = basename($_FILES["info-fileinput"]["name"]);
    $tmp_name = $_FILES["info-fileinput"]["tmp_name"];
    if ($tmp_name=="" || empty($tmp_name) || $tmp_name===NULL) {
        print(json_encode(array('success'=>false,
                                'status'=>'nofile')));
        exit(); 
    }
    $newfilename = time().'-'.replaceAll($infographicfilename,FALSE);
    $newfilesize = filesize($tmp_name);

    $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
    $db_filesize = $newfilesize;
    $db_filetype = mysql_escape_string(trim(strip_tags($_FILES["info-fileinput"]['type'])));
    
    $infographicFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE);

    $db_mainfilename_arr = explode('../../../',$infographicFileUpload['path']);
    $currFile['file_url'] = $db_mainfilename_arr[1];

    if ( $infographicFileUpload['status']=='uploadReady') {
        if ( move_uploaded_file($tmp_name, $infographicFileUpload['path']) ) {
           
            $insertQuery =  "insert into resources_infographics
                                    (title,
                                    title_id,
                                    year,
                                    newsletter_issue,
                                    file_url,
                                    event_name,
                                    other_info,
                                    cardicon_url)
                                values
                                    ('".$currFile['title']."',
                                    '".$currFile['title_id']."',
                                    '".$currFile['year']."',
                                    '".$currFile['newsletter_issue']."',
                                    '".$currFile['file_url']."',
                                    '".$currFile['eventname']."',
                                    '".$currFile['other_info']."',
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
                                    'filepath'=>stripcslashes($infographicFileUpload['path']),
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
                                'status'=>$infographicFileUpload['status'],
                                'filepath'=>stripcslashes($infographicFileUpload['path']))));
        exit(); 
    }
}

exit();

?>
