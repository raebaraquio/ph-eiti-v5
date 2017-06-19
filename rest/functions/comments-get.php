<?php
include_once('../classes/mysql_connect.php');

$mode = mysql_escape_string(trim(strip_tags($_GET['mode'])));

if ( !(isset($_GET['pk'])) || $_GET['pk'] == NULL || empty($_GET['pk']) ) {
    $cond = null;
}
else {
    $pk = mysql_escape_string(trim(strip_tags($_GET['pk'])));
    $cond = " and pk = $pk ";
}

$query = "select
                name,
                comment,
                DATE_FORMAT(dateposted, '%b %d, %Y %r') as dateposted,
                email
            from
                comments
            where posted_in = '$mode'
                $cond";

$got = mysql_query($query);

if (!$got) {
    print(mysql_error()." ".$got);
    return false;
}

while ($res = mysql_fetch_assoc($got)) {
    $data[] = $res;
}

print(json_encode($data));

?>