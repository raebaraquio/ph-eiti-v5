<?php
include_once('../../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));

$pk = mysql_escape_string(trim(strip_tags($data->pk)));
$created_by = mysql_escape_string(trim(strip_tags($data->createdBy)));

$content = "";
if (isset($data->content)) {
    $content = mysql_escape_string(trim($data->content));    
}

$publish = "";
if (isset($data->publish)) {
    if (mysql_escape_string(trim(strip_tags($data->publish)))=="publish") {
        $publish = " published = true, datepublished = CURRENT_TIMESTAMP, published_by = '$created_by' ";
    }
    else {
        $publish = " published = false";   
    }   
}

$check = "select
                content
            from news 
            where pk = $pk";
$checked = mysql_query($check);

if (!$checked) {
    print(json_encode(array('success'=>false,
                            'error'=>'dberror',
                            'mysqlerror'=>mysql_error(),
                            'query'=>$check)));
    exit();
}

if (count(mysql_num_rows($checked)) > 0) {
    if ($publish!="") {
        $update = "update news
                    set
                        $publish
                    where pk = $pk";
    }
    else {
        $update = "update news
                        set 
                            content = '$content'
                        where pk = $pk";    
    }
    
    $updated = mysql_query($update);
    if (!$updated) {
        print(json_encode(array('success'=>false,
                                'error'=>'dberror',
                                'mysqlerror'=>mysql_error(),
                                'query'=>$update)));
        exit();
    }

    print(json_encode(array('success'=>true,
                            'msg'=>"Content updated.")));
    exit();
}
else {
    print(json_encode(array('success'=>true,
                            'error'=>'Article does not exist.',
                            'query'=>$check)));
    exit();
}

?>
                            
                            