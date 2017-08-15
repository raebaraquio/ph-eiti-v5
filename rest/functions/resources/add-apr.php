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
$title = 'Annual Progress Report';

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

if (isset($_POST['apr-submit'])) {

	$coverage = $_POST['apr-coverage'];
	$thumbdata = $_POST['apr-thumbdata'];
	$title_id = 'APR-'.replaceAll($coverage,FALSE);
	
	/* Converting the thumbnail data (base64 format) into an image */

	list($type, $thumbdata) = explode(';', $thumbdata);
	list(, $thumbdata)      = explode(',', $thumbdata);
	$thumbdata = base64_decode($thumbdata);

	/* Generate and upload the thumbnail image file to the server */
	
	$thumbfilename = replaceAll($coverage,TRUE).'-thumb.png';

	$u = new Upload();

    $thumbnailUpload = $u->createFilePath($uploadType,$contentSection,$thumbfilename,TRUE);
    $db_cardicon_arr = explode('../../../',$thumbnailUpload['path']);
    $card_icon_url = '../'.$db_cardicon_arr[1];
    
    if ( $thumbnailUpload['status']=='uploadReady') {
    	file_put_contents($thumbnailUpload['path'], $thumbdata);
    }
    
	/* Main APR File */
	$aprfilename = basename($_FILES["file_input"]["name"]);
    $tmp_name = $_FILES["file_input"]["tmp_name"];
    if ($tmp_name=="" || empty($tmp_name) || $tmp_name===NULL) {
        print(json_encode(array('success'=>false,
                                'status'=>'nofile')));
        exit(); 
    }
    $newfilename = time().'-'.replaceAll($aprfilename,FALSE);
    $newfilesize = filesize($tmp_name);

    $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
    $db_filesize = $newfilesize;
    $db_filetype = mysql_escape_string(trim(strip_tags($_FILES["file_input"]['type'])));
    
    $aprFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE);

    $db_mainfilename_arr = explode('../../../',$aprFileUpload['path']);
    $file_url = '../'.$db_mainfilename_arr[1];

    if ( $aprFileUpload['status']=='uploadReady') {
        if ( move_uploaded_file($tmp_name, $aprFileUpload['path']) ) {
           
            $insertQuery = "insert into resources_activity_reports
                                (title_id,
                                title,
                                coverage,
                                file_url,
                                card_icon_url)
                            values
                                ('$title_id',
                                '$title',
                                '$coverage',
                                '$file_url',
                                '$card_icon_url')";

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
                                    'filepath'=>stripcslashes($aprFileUpload['path']),
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
                                'status'=>$aprFileUpload['status'],
                                'filepath'=>stripcslashes($aprFileUpload['path']))));
        exit(); 
    }
}

exit();

?>
