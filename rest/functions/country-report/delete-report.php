<?php 
require_once('CountryReport.php');

$crid = NULL;
if (isset($_GET['crid']) && $_GET['crid']!==NULL) {
    $crid = intval(mysql_escape_string(trim(strip_tags($_GET['crid']))));
}

$level = NULL;
if (isset($_GET['level']) && $_GET['level']!==NULL) {
    $level = mysql_escape_string(trim(strip_tags($_GET['level'])));
}

$page = NULL;
if (isset($_GET['page']) && $_GET['page']!==NULL) {
    $page = mysql_escape_string(trim(strip_tags($_GET['page'])));
}

$levelId = NULL;
if ($level!=NULL) {
    if (isset($_GET[$level]) && $_GET[$level]!==NULL) {
        $levelId = intval(mysql_escape_string(trim(strip_tags($_GET[$level]))));
    }
}

$report = new CountryReport();

if ($level!=NULL) {
    
    switch($level) {
        case "crtid":
            // Selected reporting template
            $deleted_crt = $report->delete_completed_reporting_template($crid,$levelId);
            if ($deleted_crt==0) {
                print(json_encode(
                        array(
                            'success'=>false,
                            'error'=>'db delete error - one template',
                            'status'=>'',
                            'query'=>''
                        )
                    )
                );
                exit();
            }
            break;

        case "crcontent_id":
            if ($page=="Completed Reporting Templates") {
                $deleted_all_templates = $report->delete_completed_reporting_template($crid,NULL);
                if ($deleted_all_templates==0) {
                    print(json_encode(
                            array(
                                'success'=>false,
                                'error'=>'db delete error - all templates',
                                'status'=>'',
                                'query'=>''
                            )
                        )
                    );
                    exit();
                }
            }
            else if ($page=="Computation of LGU Shares in National Wealth") {
                $deleted_all_files = $report->delete_other_files($crid,NULL);
                if ($deleted_all_files==0) {
                    print(json_encode(
                            array(
                                'success'=>false,
                                'error'=>'db delete error - other files',
                                'status'=>'',
                                'query'=>''
                            )
                        )
                    );
                    exit();
                }
            }
            $deleted_content_entry = $report->delete_content($crid,$levelId);
            if ($deleted_content_entry==0) {
                print(json_encode(
                        array(
                            'success'=>false,
                            'error'=>'db delete error - report content',
                            'status'=>'',
                            'query'=>''
                        )
                    )
                );
                exit();
            }
            break;

        case "file_id":
            // Selected other file (computaion of lgu shares in national wealth file)
            $deleted_other_file = $report->delete_other_files($crid,$levelId);
            if ($deleted_other_file==0) {
                print(json_encode(
                        array(
                            'success'=>false,
                            'error'=>'db delete error - one file',
                            'status'=>'',
                            'query'=>''
                        )
                    )
                );
                exit();
            }
            break;
    }

    print(json_encode(
        array(
            'success'=>true,
            'query'=>$query,
            'status'=>'ok')
        )
    );
    exit();
}
else {
    // Full Report Deletion
    $returndata = $report->delete_report($crid);
    print(json_encode($returndata));
    exit();
}




?>
