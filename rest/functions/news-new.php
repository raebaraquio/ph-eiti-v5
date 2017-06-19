<?php
include_once('../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));

$id = mysql_escape_string(trim(strip_tags($data->id)));
$title = mysql_escape_string(trim(strip_tags($data->title)));
$subhead = mysql_escape_string(trim(strip_tags($data->subhead)));
$section = mysql_escape_string(trim(strip_tags($data->section)));
$author = mysql_escape_string(trim(strip_tags($data->author)));
$dateposted = mysql_escape_string(trim(strip_tags($data->dateposted)));
$brief = mysql_escape_string(trim($data->brief));
$readmore_label = mysql_escape_string(trim(strip_tags($data->readmorelabel)));
$readmore_source = mysql_escape_string(trim(strip_tags($data->source)));
$readmore_sourcewebsite = mysql_escape_string(trim(strip_tags($data->sourcewebsite)));
$content = mysql_escape_string(trim($data->contentbody));

$created_by = mysql_escape_string(trim(strip_tags($data->created_by)));
$published = mysql_escape_string(trim(strip_tags($data->published)));
$pubcond = NULL;
if ($published == 'false') {
$pubcond = ", false";
}
else {
$pubcond = ", true";
}
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
                 content,
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
                 '$content',
                 '$created_by'
                 $pubcond)";
             
$get = mysql_query($query);

if (!$get) {
    print(mysql_error()." ".$query);
    exit;
}

$currval = mysql_insert_id();
print $currval;

?>
                            
                            