<?php
include_once('../../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));

$pk = mysql_escape_string(trim(strip_tags($data->pk)));
$action = mysql_escape_string(trim(strip_tags($data->action)));
$updated_by = mysql_escape_string(trim(strip_tags($data->updatedBy)));

$action_cond = null;
$verb = '';
switch($action) {
    case 'publish':
        $checkquery = "select published from news where pk = $pk";
        $checked = mysql_query($checkquery);
        if (!$checked) {
            print(json_encode(array('success'=>false,
                                    'error'=>'dberror',
                                    'mysqlerror'=>mysql_error(),
                                    'query'=>$check)));
            exit();
        }
        if (mysql_num_rows($checked)>0) {
            while ($returndata = mysql_fetch_assoc($checked)) {
                if ($returndata['published']=='1' || $returndata['published']==1) {
                    print(json_encode(array('success'=>true,
                                    'error'=>'Article is already published.',
                                    'query'=>$checkquery)));
                    exit();
                }
            }
            $action_cond = " published = true, datepublished = CURRENT_TIMESTAMP, published_by = '$updated_by', archived = false, date_archived = null, archived_by = '' ";
            $verb = 'published';
        }
        else {
            print(json_encode(array('success'=>true,
                                    'error'=>'No article found with ID - $pk.',
                                    'query'=>$checkquery)));
            exit();
        }
        break;

    case 'unpublish':
        $checkquery = "select published from news where pk = $pk";
        $checked = mysql_query($checkquery);
        if (!$checked) {
            print(json_encode(array('success'=>false,
                                    'error'=>'dberror',
                                    'mysqlerror'=>mysql_error(),
                                    'query'=>$check)));
            exit();
        }
        if (mysql_num_rows($checked)>0) {
            while ($returndata = mysql_fetch_assoc($checked)) {
                if ($returndata['published']=='0' || $returndata['published']==0) {
                    print(json_encode(array('success'=>true,
                                    'error'=>'Article is already unpublished.',
                                    'query'=>$checkquery)));
                    exit();
                }
            }
            $action_cond = " published = false, datepublished = null, published_by = '', archived = false, date_archived = null, archived_by = '' ";
            $verb = 'unpublished';
        }
        else {
            print(json_encode(array('success'=>true,
                                    'error'=>'No article found with ID - $pk.',
                                    'query'=>$checkquery)));
            exit();
        }
        break;
    case 'archive':
        $checkquery = "select archived from news where pk = $pk";
        $checked = mysql_query($checkquery);
        if (!$checked) {
            print(json_encode(array('success'=>false,
                                    'error'=>'dberror',
                                    'mysqlerror'=>mysql_error(),
                                    'query'=>$check)));
            exit();
        }
        if (mysql_num_rows($checked)>0) {
            while ($returndata = mysql_fetch_assoc($checked)) {
                if ($returndata['archived']=='1' || $returndata['archived']==1) {
                    print(json_encode(array('success'=>true,
                                    'error'=>'Article is already archived.',
                                    'query'=>$checkquery)));
                    exit();
                }
            }
            $action_cond = " archived = true, date_archived = CURRENT_TIMESTAMP, archived_by = '$updated_by' ";
            $verb = 'archived';
        }
        else {
            print(json_encode(array('success'=>true,
                                    'error'=>'No article found with ID - $pk.',
                                    'query'=>$checkquery)));
            exit();
        }
        break;
    case 'unarchive':
        $checkquery = "select archived from news where pk = $pk";
        $checked = mysql_query($checkquery);
        if (!$checked) {
            print(json_encode(array('success'=>false,
                                    'error'=>'dberror',
                                    'mysqlerror'=>mysql_error(),
                                    'query'=>$check)));
            exit();
        }
        if (mysql_num_rows($checked)>0) {
            while ($returndata = mysql_fetch_assoc($checked)) {
                if ($returndata['archived']=='0' || $returndata['archived']==0) {
                    print(json_encode(array('success'=>true,
                                    'error'=>'Article is already unarchived.',
                                    'query'=>$checkquery)));
                    exit();
                }
            }
            $action_cond = " archived = false, date_archived = null, archived_by = '' ";
            $verb = 'unarchived';
        }
        else {
            print(json_encode(array('success'=>true,
                                    'error'=>'No article found with ID - $pk.',
                                    'query'=>$checkquery)));
            exit();
        }
        break;
}


$updatequery = "update news set $action_cond where pk = $pk";
$updated = mysql_query($updatequery);

if (!$updated) {
    print(json_encode(array('success'=>false,
                            'error'=>'dberror',
                            'mysqlerror'=>mysql_error(),
                            'query'=>$updated)));
    exit();
}


print(json_encode(array('success'=>true,
                        'msg'=>"Article $verb.")));
exit();


?>
                            
                            