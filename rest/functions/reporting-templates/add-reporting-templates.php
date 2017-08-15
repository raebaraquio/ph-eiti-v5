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
$contentSection = 'Reporting-Template';

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

if (isset($_POST['rt-submit'])) {

    $lastError = '';

    $year = '';
    if (isset($_POST['rt-year']) && !(empty($_POST['rt-year']))) {
        $year = explode('string:', $_POST['rt-year'])[1];
        $year = mysql_escape_string(trim(strip_tags($year)));
    }

    $sector = '';
    if (isset($_POST['rt-sector']) && !(empty($_POST['rt-sector']))) {
        $sector = explode('string:', $_POST['rt-sector'])[1];
        $sector = mysql_escape_string(trim(strip_tags($sector)));
    }

    $title = '';
    $sub_sector = '';
    $company_agency_name = '';
    if ($sector=='Industry') {
        if (isset($_POST['rt-industry']) && !(empty($_POST['rt-industry']))) {
            $title = explode('string:', $_POST['rt-industry'])[1];
            $title = mysql_escape_string(trim(strip_tags($title)));
            $sub_sector = $title;
        }
    }
    else if ($sector=='Government Agencies') {
        if (isset($_POST['rt-agency']) && !(empty($_POST['rt-agency']))) {
            $title = mysql_escape_string(trim(strip_tags($_POST['rt-agency'])));
            $company_agency_name = $title;
        }
    }

    $currFile = array('year'=>$year,    
                      'sector'=>$sector,
                      'sub_sector'=>$sub_sector,
                      'title'=>$title,
                      'company_agency_name'=>$company_agency_name,
                      'file_url'=>'');

    if (isset($_FILES['rt-fileinput'])) {
        $rtfilename = basename($_FILES["rt-fileinput"]["name"]);
        $file_tmp_name = $_FILES["rt-fileinput"]["tmp_name"];   

        if ($file_tmp_name=="" || empty($file_tmp_name) || $file_tmp_name===NULL) {
            print(json_encode(array('success'=>false,
                                    'status'=>'nofile')));
            exit(); 
        }

        $newfilename = replaceAll($rtfilename,FALSE);
        $newfilesize = filesize($file_tmp_name);
        $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
        $db_filesize = $newfilesize;
        $db_filetype = mysql_escape_string(trim(strip_tags($_FILES["rt-fileinput"]['type'])));

        $u = new Upload();
        $rtFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE);

        $db_mainfilename_arr = explode('../../../',$rtFileUpload['path']);
        $currFile['file_url'] = '../'.$db_mainfilename_arr[1];

        if ( $rtFileUpload['status']=='uploadReady') {

            if ( move_uploaded_file($file_tmp_name, $rtFileUpload['path']) ) {

                $insertQuery = "insert into reporting_templates
                                    (year,
                                    sector,
                                    sub_sector,
                                    title,
                                    company_agency_name,
                                    file_url)
                                values
                                    ('".$currFile['year']."',
                                    '".$currFile['sector']."',
                                    '".$currFile['sub_sector']."',
                                    '".$currFile['title']."',
                                    '".$currFile['company_agency_name']."',
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
            $lastError = $rtFileUpload['status'];
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
