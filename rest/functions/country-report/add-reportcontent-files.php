<?php 
require_once('../../classes/Upload.php');
require_once('../../classes/mysql_connect.php');
require_once('CountryReport.php');

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
$contentSection = 'EITIReport';
$errorCount = 0;
$lastError = '';

/* 
$post = file_get_contents('php://input');
$data = json_decode($post);
*/

///////////// 

if (isset($_POST['newrepcontent-submit'])) {  

    $contentType = "";
    if (isset($_POST['newrepcontent-type']) && !(empty($_POST['newrepcontent-type']))) {
        $contentType = mysql_escape_string(trim(strip_tags($_POST['newrepcontent-type'])));
    }

    $db_content_type = "";
    switch ($contentType) {
        case 'Data Summary Template':
            $db_content_type = "mso-file";
            break;
        case 'Completed Reporting Templates':
            $db_content_type = "page";
            break;
        case 'New Folder':
            $db_content_type = "page";
            break;
        default:
            $db_content_type = "document";
            break;
    }

    $sector = "";
    if (isset($_POST['newrepcontent-sector']) && !(empty($_POST['newrepcontent-sector']))) {
        $sector = mysql_escape_string(trim(strip_tags($_POST['newrepcontent-sector'])));
    }   

    $crid_fk = NULL;
    if (isset($_POST['newrepcontent-crid']) && !(empty($_POST['newrepcontent-crid']))) {
        $crid_fk = intval(mysql_escape_string(trim(strip_tags($_POST['newrepcontent-crid']))));
    }

    $report_title = "";
    $report_title_id = "";
    if (isset($_POST['newrepcontent-reporttitle']) && !(empty($_POST['newrepcontent-reporttitle']))) {
        $report_title = mysql_escape_string(trim(strip_tags($_POST['newrepcontent-reporttitle'])));
        $report_title_id = replaceAll($report_title,FALSE); 

    }

    $numfiles = 0;
    if (isset($_POST['newrepcontent-filecount']) && !(empty($_POST['newrepcontent-filecount'])) ) {
        $numfiles = intval(mysql_escape_string(trim(strip_tags($_POST['newrepcontent-filecount']))));
    }

    $newfoldername = "";
    if (isset($_POST['newrepcontent-newfolder']) && !(empty($_POST['newrepcontent-newfolder']))) {
        $newfoldername = mysql_escape_string(trim(strip_tags($_POST['newrepcontent-newfolder'])));
    }

    // Check if content section is Completed Reporting Templates
    $page_content_id = NULL;
    $spec_folder_id = $report_title_id;
    if ($contentType=='Completed Reporting Templates') {
        $report = new CountryReport();
        $page_content_id = $report->get_page_content_id($crid_fk,'Completed Reporting Templates');
        $spec_folder_id = $report_title_id.'/Completed-Reporting-Templates';
    }
    else if ($contentType==='New Folder') {
        $report = new CountryReport();
        $page_content_id = $report->get_page_content_id($crid_fk,$newfoldername);
        $spec_folder_id = $report_title_id.'/'.replaceAll($newfoldername,FALSE);
    }

    if ($numfiles > 0) {

        for ($i=0;$i<$numfiles;$i++) {

            if (isset($_FILES['newrepcontent-file-'.$i])) {

                $file_title = "";
                if (isset($_POST['newrepcontent-filetitle-'.$i]) && !(empty($_POST['newrepcontent-filetitle-'.$i]))) {
                    $file_title = mysql_escape_string(trim(strip_tags($_POST['newrepcontent-filetitle-'.$i])));
                }

                // Set card icon URL
                $card_icon_url = '';
                if ($db_content_type=='mso-file') {
                    $card_icon_url = 'document/EITI-Report/card-icon-xlsx.png';
                }
                else if ($db_content_type=='page') { // For Page and Documents
                    $card_icon_url = 'document/EITI-Report/card-icon-none.png';
                }
                else {
                    /* Converting the thumbnail data (base64 format) into an image */
                    $thumbdata = $_POST['thumbdata-'.$i];
                    list($type, $thumbdata) = explode(';', $thumbdata);
                    list(, $thumbdata)      = explode(',', $thumbdata);
                    $thumbdata = base64_decode($thumbdata);

                    /* Generate and upload the thumbnail image file to the server */
                    
                    $thumbfilename = 'card-icon-'.replaceAll($file_title,TRUE).'.png'; 

                    $u = new Upload();

                    $thumbnailUpload = $u->createFilePath($uploadType,$contentSection,$thumbfilename,TRUE,$report_title_id);
                    $db_cardicon_arr = explode('../../../',$thumbnailUpload['path']);
                    $card_icon_url = $db_cardicon_arr[1];
                    
                    if ( $thumbnailUpload['status']=='uploadReady') {
                        file_put_contents($thumbnailUpload['path'], $thumbdata);
                    }

                    if ($contentSection=='Country Report' && $crid_fk!=NULL) {
 
                        // Update card icon of Country Report
                        $udpateQuery = "update country_reports
                                            set 
                                                card_icon_url = '../".$card_icon_url."'
                                        where 
                                            crid = ".$crid_fk." and 
                                            card_icon_url = '../document/EITI-Report/card-icon.png' ;";
                                            
                        $updatedCardIcon = mysql_query($udpateQuery);

                        if (!$updatedCardIcon) {
                            $errorCount++;
                            $lastError = 'setcardiconfailed';
                        }
                        // End: Update card icon of Country Report

                    }

                }

                $currFile = array('type'=>$contentType,    
                                  'sector'=>$sector,
                                  'crid_fk'=>$crid_fk,
                                  'count'=>$numfiles,
                                  'newfolder'=>$newfoldername,
                                  'content_type'=>$db_content_type,
                                  'file_title'=>$file_title,
                                  'report_folder'=>$report_title_id,
                                  'thumbfilename'=>$thumbfilename,
                                  'card_icon_url'=>'../'.$card_icon_url,
                                  'crcontent_id_fk'=>'',
                                  'file_url'=>'');

                if ($page_content_id!=NULL) {
                    $currFile['crcontent_id_fk'] = $page_content_id;
                }
                
                $repfile_filename = basename($_FILES["newrepcontent-file-".$i]["name"]);
                $file_tmp_name = $_FILES["newrepcontent-file-".$i]["tmp_name"];   

                if ($file_tmp_name=="" || empty($file_tmp_name) || $file_tmp_name===NULL) {
                    print(json_encode(array('success'=>false,
                                            'status'=>'nofile')));
                    exit(); 
                }

                $newfilename = replaceAll($repfile_filename,FALSE);
                $newfilesize = filesize($file_tmp_name);
                $db_filename = mysql_escape_string(trim(strip_tags($newfilename)));
                $db_filesize = $newfilesize;
                $db_filetype = mysql_escape_string(trim(strip_tags($_FILES["newrepcontent-file-".$i]['type'])));

                $u = new Upload();
                $repcontentfileFileUpload = $u->createFilePath($uploadType,$contentSection,$newfilename,TRUE,$spec_folder_id);

                $db_mainfilename_arr = explode('../../../',$repcontentfileFileUpload['path']);
                $currFile['file_url'] = '../'.$db_mainfilename_arr[1];

                if ( $repcontentfileFileUpload['status']=='uploadReady') {

                    if ( move_uploaded_file($file_tmp_name, $repcontentfileFileUpload['path']) ) {

                        switch ($contentType) {
                            case 'New Folder':
                                $insertQuery = "insert into country_report_otherfiles
                                                    (crid_fk,
                                                    crcontent_id_fk,
                                                    title,
                                                    file_url)
                                                values
                                                    (".intval($currFile['crid_fk']).",
                                                    ".intval($currFile['crcontent_id_fk']).",
                                                    '".$currFile['file_title']."',
                                                    '".$currFile['file_url']."')";
                                break;

                            case 'Completed Reporting Templates':
                                $insertQuery = "insert into completed_reporting_templates
                                                (crid_fk,
                                                crcontent_id_fk,
                                                sector,
                                                title,
                                                company_agency_name,
                                                file_url)
                                            values
                                                (".intval($currFile['crid_fk']).",
                                                ".intval($currFile['crcontent_id_fk']).",
                                                '".$currFile['sector']."',
                                                '".$currFile['file_title']."',
                                                '".$currFile['file_title']."',
                                                '".$currFile['file_url']."')";
                                break;
                            
                            default:
                                $insertQuery = "insert into country_reports_content
                                                    (crid_fk,
                                                    title,
                                                    content_type,
                                                    card_icon_url,
                                                    file_url)
                                                values
                                                    (".intval($currFile['crid_fk']).",
                                                    '".$currFile['file_title']."',
                                                    '".$currFile['content_type']."',
                                                    '".$currFile['card_icon_url']."',
                                                    '".$currFile['file_url']."')";
                                break;
                        }

                        $inserted = mysql_query($insertQuery);

                        if (!$inserted) {
                            $errorCount++;
                            $lastError = 'sqlerror-'.mysql_error();
                        }

                    }
                    else {
                        $errorCount++;
                        $lastError = $repcontentfileFileUpload['status'];
                    }
                }
                else {
                    $errorCount++;
                    $lastError = $repcontentfileFileUpload['status'];
                }
            }
        }
    }
    
    if ($errorCount > 0) {
        print(json_encode(array('success'=>false,
                                'status'=>'error',
                                'error'=>$lastError)));
    }
    else {
        print(json_encode(array('success'=>true,
                                'status'=>'fileuploaded')));
    }    
    exit();
}




?>
