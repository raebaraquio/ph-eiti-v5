<?php
include_once('../../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));
$pk = mysql_escape_string(trim(strip_tags($data->pk)));

$sectionCond = null;
if (isset($data->contentsection)) {
    $sectionCond = " and contentsection = '".mysql_escape_string(trim(strip_tags($data->contentsection)))."'";
}

$query = "select 
            imgid,
            newsfk,
            filename,
            folderdestination,
            contentsection,
            uploadedby,
            dateuploaded
        from articleimages
        where newsfk = $pk
            $sectionCond";

$get = mysql_query($query);

if (!$get) {
    print(json_encode(array('success'=>false,
                            'mysqlerror'=>mysql_error(),
                            'query'=>$query)));
    exit;
}

$return = array();
while ($response = mysql_fetch_assoc($get)) {
    $return[] = $response;
}

print(json_encode(array('success'=>true,
                        'data'=>$return,
                        'query'=>$query)));

?>
                            
                            