<?php
include_once('../classes/mysql_connect.php');

$confirmation = mysql_escape_string(trim(strip_tags($_GET['confirmation'])));

if ($confirmation == 'unconfirmed') {
    $confirmed = 0;
}
else {
    $confirmed = 1;
}

$query = "select
                subscriber,
                subscriber_email
            from
                newsletter_subscribers
            where confirmed = $confirmed
                and subscribed = 1";

// print ($query);
// exit();
$got = mysql_query($query);

if (!$got) {
    print(mysql_error()." ".$got);
    return false;
}

$export = "Email Address,Name\n";

while ($res = mysql_fetch_assoc($got)) {
    $export .= $res['subscriber_email'].",".$res['subscriber']."\n";
}

$filename = "PH-EITISubscribers-".time().".csv";

header('Content-type: text/csv');
header("Content-disposition: attachment;filename=\"$filename\"");

echo $export;
?>