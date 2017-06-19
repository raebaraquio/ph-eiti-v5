<?php
include_once('../../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));

$id = mysql_escape_string(trim(strip_tags($data->id)));
$title = mysql_escape_string(trim(strip_tags($data->title)));
$subhead = "";
if (isset($data->subtitle)) {
    $subhead = mysql_escape_string(trim(strip_tags($data->subtitle)));    
}
$section = "";
if (isset($data->section)){
    $section = mysql_escape_string(trim(strip_tags($data->section)));    
}
$author = "";
if (isset($data->author)){
    $author = mysql_escape_string(trim(strip_tags($data->author)));    
}
$dateposted = mysql_escape_string(trim(strip_tags($data->dateposted)));
$brief = mysql_escape_string(trim($data->excerpt));

$readmore_label = mysql_escape_string(trim(strip_tags($data->readmore)));
$readmore_source = mysql_escape_string(trim(strip_tags($data->sourceurl)));
$readmore_sourcewebsite = mysql_escape_string(trim(strip_tags($data->source)));
$created_by = mysql_escape_string(trim(strip_tags($data->createdBy)));

if ($title!=="") {
    $query = "insert into news
                    (id,
                     title,
                     subhead,
                     section,
                     author,
                     dateposted,
                     brief,
                     readmore_label,
                     readmore_source,
                     readmore_sourcewebsite,
                     created_by,
                     published)
                values
                    ('$id',
                     '$title',
                     '$subhead',
                     '$section',
                     '$author',
                     '$dateposted',
                     '$brief',
                     '$readmore_label',
                     '$readmore_source',
                     '$readmore_sourcewebsite',
                     '$created_by',
                      false)";

    $get = mysql_query($query);

    if (!$get) {
        print(json_encode(array('success'=>false,
                                'mysqlerror'=>mysql_error(),
                                'query'=>$query)));
        exit;
    }

    $currval = mysql_insert_id();
    print(json_encode(array('success'=>true,
                            'newspk'=>$currval,
                            'query'=>$query)));
}
else {
    print(json_encode(array('success'=>false,
                            'error'=>'No article found.',
                            'query'=>$query)));
    exit;
}

?>
                            
                            