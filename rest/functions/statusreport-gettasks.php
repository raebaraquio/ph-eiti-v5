<?php
include_once('../classes/mysql_connect.php');

if ( !(isset($_GET['pk'])) || $_GET['pk'] == NULL || empty($_GET['pk']) ) {
    $cond = null;
}
else {
    $pk = mysql_escape_string(trim(strip_tags($_GET['pk'])));
    $cond = " where pk = $pk ";
}

$query = "select
                pk,
                task,
                reportstatus,
                description,
                addedby,
                DATE_FORMAT(dateadded, '%b %d, %Y %r') as dateadded
            from
                statusreport
                $cond
            order by dateadded desc;";

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