<?php
include_once('../classes/mysql_connect.php');


$get = "SELECT * FROM relatedlinks";
        
$got = mysql_query($get);


if (!$got) {
    print(mysql_error()." ".$get);
    return false;
}

while ($res = mysql_fetch_assoc($got)) {
    $data[] = $res;
}

print(json_encode($data));

?>