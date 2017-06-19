<?php
include_once('../classes/mysql_connect.php');
include_once('../classes/PHPMailer/class.phpmailer.php');

function send_confirmation_email($address, $message) {
    $mail = new PHPMailer(true);
    try {
        $mail->AddAddress($address);
        $mail->AddBCC('siteadmin@ph-eiti.org','PH-EITI Website Administrator');
        $mail->AddBCC('secretariat@ph-eiti.org','PH-EITI Secretariat');
        $mail->SetFrom('no-reply@ph-eiti.org','PH-EITI Website');
        $mail->Subject = $message['subject'];
        $mail->AltBody = $message['text'];
        $mail->MsgHTML($message['html']);
        $mail->Send();
        return(TRUE);
    }
    catch (phpmailerException $e) {
        return(FALSE);
    }
    catch (Exception $e) {
        return(FALSE);
    }
}

function create_confirmation_message($confirmation_id,$recipient,$recip_name) {
    if (empty($recip_name) || $recip_name=='' || $recip_name == NULL) {
        $greetings = 'Greetings!';
    }
    else {
        $greetings = 'Hi '.$recip_name.'!';
    }

    $subject = 'Confirm your PH-EITI Newsletter Subscription';

    $text = <<<EOT
$greetings
Click the link below to confirm your subscription to our newsletter.
http://ph-eiti.org/be/nl/confirm.php?k=$confirmation_id&e=$recipient
EOT;

    $html = <<<EOT
<center style="color:#7c7c7c;font-family:'Helvetica','Arial',sans-serif;">
<h3>$greetings</h3>
<h2>Click the button below to confirm your newsletter subscription.</h2>
<br/>
<p>
<a style="padding:10px;padding-left:17px;padding-right:17px;background-color:#fabc01;color:#fff;font-family:'Arial',sans-serif;font-size:20px;text-decoration:none;" href="http://ph-eiti.org/be/nl/confirm.php?k=$confirmation_id&e=$recipient">Confirm</a>
</p>
<br/><br/>
<p>
<hr />
<small>Copyright 2014 PH-EITI. All Rights Reserved.</small> <br/>
<small>4/F DOF building, Roxas Blvd. Corner Pablo Ocampo St.,<br /> Manila 1004, Philippines</small> <br/>
<small>inquiries@ph-eiti.org<br/>02-525-0487</small> 
</p>
</center>
EOT;
    
    return(array('subject'=>$subject,'text'=>$text,'html'=>$html));
}


// ----------------
// Get request data
// ----------------
$data = json_decode(file_get_contents("php://input"));

$name = mysql_escape_string(trim(strip_tags($data->name)));
$email = mysql_escape_string(trim(strip_tags($data->email)));

if (empty($name) || $name=='' || $name == NULL) {
    $name = '';
}

$check = "select 
            subscriber_email
        from newsletter_subscribers
        where subscriber_email = '$email'";

$result_check = mysql_query($check);

if (!$result_check) {
    print http_response_code(400);
    exit;
}

if (mysql_num_rows($result_check) > 0) {
    print http_response_code(409);
    exit();
}
else {
    $query = "insert into newsletter_subscribers
                    (subscriber,
                     subscriber_email)
                values
                    ('$name',
                    '$email')";
                 
    $get = mysql_query($query);

    if (!$get) {
        print http_response_code(400);
        exit;
    }

    $currval = mysql_insert_id();

    // --------------------------------
    // Start: Create confirmation email
    // --------------------------------
    $message = create_confirmation_message($currval,$email,$name);    
    send_confirmation_email($email, $message);
    // --------------------------------
    // End: Create confirmation email
    // --------------------------------

    print $currval;    
    exit();
}

?>
                            
                            