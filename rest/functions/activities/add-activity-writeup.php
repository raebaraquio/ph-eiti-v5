<?php
require_once('../../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));

$content = "";
$activity_id_fk = NULL;
if (isset($data)) {
    $content = mysql_escape_string(trim($data->content));    
    $activity_id_fk = intval(mysql_escape_string(strip_tags(trim($data->id))));    
}

if ($content=="") {
    print(json_encode(array('success'=>false,
                            'error'=>'Empty content.')));
    exit();
}

if ($activity_id_fk==NULL) {
    print(json_encode(array('success'=>false,
                            'error'=>'paramError')));
    exit();
}

$update = "update activities
                set 
                    writeup_content = '".$content."'
                where id = ".$activity_id_fk.";";    


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


?>
                            
                            