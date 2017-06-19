<?php
include_once('../classes/mysql_connect.php');

$confirmation_id = mysql_escape_string(trim(strip_tags($_GET['k'])));
$subscribed_email = mysql_escape_string(trim(strip_tags($_GET['e'])));

$query = "update newsletter_subscribers
                set 
                    confirmed = true,
                    date_confirmed = CURRENT_TIMESTAMP
            where pk = $confirmation_id and 
                subscriber_email = '$subscribed_email';";

$got = mysql_query($query);

if (!$got) {
    print(mysql_error()." ".$got);
    return false;
}

$html = <<<SOT
<center style="color:#7c7c7c;font-family:'Helvetica','Arial',sans-serif;">
<br/><br/><br/>
<h3>Subscription confirmed!</h3>
<h5>Thank you.</h5>
<p>
<a style="padding:10px;padding-left:17px;padding-right:17px;background-color:#fabc01;color:#fff;font-family:'Arial',sans-serif;font-size:20px;text-decoration:none;" href="http://ph-eiti.org/">Go to PH-EITI Website</a>
</p>
<p>
<br/><br/>
<hr />
<br/>
<br/>
<small>Copyright 2014 PH-EITI. All Rights Reserved.</small> <br/>
<small>4/F DOF building, Roxas Blvd. Corner Pablo Ocampo St.,<br /> Manila 1004, Philippines</small> <br/>
<small>inquiries@ph-eiti.org<br/>02-525-0487</small> 
</p>
</center>
SOT;

print $html;
exit();

?>