<?php
include_once('../classes/mysql_connect.php');

$query = "select
                subscriber,
                subscriber_email,
                DATE_FORMAT(datesubscribed, '%b %d, %Y %r') as datesubscribed,
                subscribed,
                confirmed
            from
                newsletter_subscribers
            where subscribed = 1";

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