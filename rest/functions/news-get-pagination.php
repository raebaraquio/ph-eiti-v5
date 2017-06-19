<?php
include_once('../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));

$section = mysql_escape_string(trim(strip_tags($data->section)));
$id = mysql_escape_string(trim(strip_tags($data->id)));
$p = mysql_escape_string(trim(strip_tags($data->published)));
$page = mysql_escape_string(trim(strip_tags($data->page)));

$published = false;
if ($p == 'true' || $p == true) {
    $published = true;
}

$id_cond = NULL;
if ($id != '' && $id != NULL && !empty($id)) {
    $id_cond = "and id = '$id'";
}

$limit_cond = NULL;
switch ($page) {
    case 'home':
        $limit_cond = 'limit 6';
        break;

    case 'index':
        // $limit_cond = 'limit 10';
        $limit_cond = NULL;
        break; 

    case 'newsIndex':
        // $limit_cond = 'limit 10';
        $pageLimit = mysql_escape_string(trim(strip_tags($data->pageLimit)));
        $pageNum = mysql_escape_string(trim(strip_tags($data->pageNum)));
        
        $limit_cond = "limit $pageLimit";
        $offset = 1;

        if ($pageNum > 1) {
            $offset = $pageLimit*($pageNum-1);    
        }
        
        if ($offset > 1) {
            $limit_cond = $limit_cond." offset $offset ";
        }
        
        break;      
}

$newsectionCond = " section = '$section' ";
if ($section=='News and Events') {
    $newsectionCond = " (section = '$section' || section = 'PH-EITI in the News') ";
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
                published
            from
                news
            where 
                $newsectionCond
                $id_cond
                and published = true
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