<?php
include_once('../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));
$section = mysql_escape_string(trim(strip_tags($data->section)));
$published = mysql_escape_string(trim(strip_tags($data->published)));
$pageLimit = mysql_escape_string(trim(strip_tags($data->pageLimit)));
$pageNum = mysql_escape_string(trim(strip_tags($data->pageNum)));

$limit_cond = NULL;
$limit_cond = "limit $pageLimit";
$offset = 1;
if ($pageNum > 1) {
    $offset = $pageLimit*($pageNum-1);    
}
if ($offset > 1) {
    $limit_cond = $limit_cond." offset $offset ";
}

$newsectionCond = " section = '$section' ";
if ($section=='News and Events') {
    $newsectionCond = " (section = '$section' || section = 'PH-EITI in the News') ";
}

$pubCond = " and ";
if ($published=='Published') {
    $pubCond .= ' published = true and (archived = null or archived = false )';
}
else if ($published=='Unpublished') {
    $pubCond .= ' published = false and (archived = null or archived = false )';
}
else if ($published=='Archived') {
    $pubCond .= ' archived = true ';   
}

$query = "select
                pk,
                id,
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
                published,
                archived
            from
                news
            where 
                $newsectionCond
                $pubCond
                order by date_created desc
            $limit_cond";

$got = mysql_query($query);

if (!$got) {
    print(mysql_error()." ".$got);
    return false;
}

if (mysql_num_rows($got) > 0) {
    while ($res = mysql_fetch_assoc($got)) {
        $newsdata[] = $res;
    }

    print(json_encode($newsdata));    
    exit();
}
else {
    print(trim(NULL));
    exit();    
}

?>