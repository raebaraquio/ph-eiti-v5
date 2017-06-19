<?php
include_once('../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));

$section = mysql_escape_string(trim(strip_tags($data->section)));
$id = mysql_escape_string(trim(strip_tags($data->id)));
$p = mysql_escape_string(trim(strip_tags($data->published)));
$page = mysql_escape_string(trim(strip_tags($data->page)));

$published = false;
$cms = "";
if ($p == 'true' || $p == true) {
    $published = true;
    $cms = "false";
}
else if ($p==null || $p==NULL || empty($p)) {
    $cms = "true";
}

$id_cond = NULL;
if ($id != '' && $id != NULL && !empty($id)) {
    $id_cond = "and id = '$id'";
}

$pk_cond = NULL;
if (isset($data->pk) && $data->pk!==NULL && !(empty($data->pk))) {
    $pk_cond = " and pk = ".$data->pk;
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

    case 'index-msg-of-month':
        $limit_cond = 'limit 1';
        break;
}

$newsectionCond = " section = '$section' ";
if ($section=='News and Events') {
    $newsectionCond = " (section = '$section' || section = 'PH-EITI in the News') ";
}

if ($cms=="false" || $cms=="") {
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
}
else {
    // Get published or not in Content Management
    $query = "select
                pk,
                id,
                title,
                subhead,
                subhead as subtitle,
                section,
                author,
                dateposted,
                brief,
                brief as excerpt,
                readmore_label,
                readmore_label as readmore,
                readmore_source,
                readmore_source as sourceurl,
                readmore_sourcewebsite,
                readmore_sourcewebsite as source,
                content,
                published,
                case 
                    when published is true then 'Published' else 'Unpublished'
                end as publishedstatus
            from
                news
            where 
                $newsectionCond
                $id_cond
                and ( published = true or published = false )
                $pk_cond
                order by date_created desc
            $limit_cond";    
}

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