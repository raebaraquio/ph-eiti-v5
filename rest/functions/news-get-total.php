<?php
include_once('../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));

$section = mysql_escape_string(trim(strip_tags($data->section)));
$published = mysql_escape_string(trim(strip_tags($data->published)));
$page = mysql_escape_string(trim(strip_tags($data->page)));

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
               count(*) as count
            from news
            where
                $newsectionCond
                $pubCond ";

$got = mysql_query($query);

if (!$got) {
    print(mysql_error()." ".$got);
    return false;
}

if (mysql_num_rows($got) > 0) {
    while ($res = mysql_fetch_assoc($got)) {
        $newsdata = $res;
    }
    print(json_encode($newsdata));    
    exit();
}
else {
    print(trim(NULL));
    exit();    
}

?>