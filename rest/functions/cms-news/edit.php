<?php
include_once('../../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->pk)) {
    print(json_encode(array('success'=>false,
                            'error'=>'No pk found.')));
    exit();
}

$pk = mysql_escape_string(trim(strip_tags($data->pk)));
$lastupdatedby = mysql_escape_string(trim(strip_tags($data->lastupdatedby)));

$save_section = mysql_escape_string(trim(strip_tags($data->action)));
$updateQuery = "";

switch ($save_section) {
    case 'Details':
        $data->author = mysql_escape_string(trim(strip_tags($data->author)));
        $data->brief = mysql_escape_string(trim(strip_tags($data->brief)));
        $data->lastupdatedby = mysql_escape_string(trim(strip_tags($data->lastupdatedby)));
        $data->excerpt = mysql_escape_string(trim(strip_tags($data->excerpt)));
        $data->readmore_label = mysql_escape_string(trim(strip_tags($data->readmore_label)));
        $data->readmore_source = mysql_escape_string(trim(strip_tags($data->readmore_source)));
        $data->readmore_sourcewebsite = mysql_escape_string(trim(strip_tags($data->readmore_sourcewebsite)));
        $data->source = mysql_escape_string(trim(strip_tags($data->source)));
        $data->sourceurl = mysql_escape_string(trim(strip_tags($data->sourceurl)));
        $data->subhead = mysql_escape_string(trim(strip_tags($data->subhead)));
        $data->title = mysql_escape_string(trim(strip_tags($data->title)));
        $data->id = mysql_escape_string(trim(strip_tags($data->id)));

        $updateQuery = "update news
                            set
                                author  = '$data->author',
                                lastupdatedby = '$data->lastupdatedby',
                                datelastupdated = CURRENT_TIMESTAMP,
                                brief = '$data->brief',
                                readmore_label = '$data->readmore_label',
                                readmore_sourcewebsite = '$data->readmore_sourcewebsite',
                                readmore_source = '$data->readmore_source',
                                subhead = '$data->subhead',
                                title = '$data->title',
                                id = '$data->id'
                        where pk = $pk";
        break;

    case 'Content':
        $content = "";
        if (isset($data->content)) {
            $content = mysql_escape_string(trim($data->content));    
        }
        $data->lastupdatedby = mysql_escape_string(trim(strip_tags($data->lastupdatedby)));
        $updateQuery = "update news
                            set 
                                content = '$content',
                                lastupdatedby = '$data->lastupdatedby',
                                datelastupdated = CURRENT_TIMESTAMP
                            where pk = $pk";   
        break;
    
    default:
        # code...
        break;
}

$updated = mysql_query($updateQuery);
if (!$updated) {
    print(json_encode(array('success'=>false,
                            'error'=>'Database error. '+mysql_error(),
                            'mysqlerror'=>mysql_error(),
                            'query'=>$update)));
    exit();
}

print(json_encode(array('success'=>true,
                        'msg'=>$save_section." updated.")));

exit();


?>
                            
                            