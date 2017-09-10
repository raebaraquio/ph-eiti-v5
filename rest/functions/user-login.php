<?php
include_once('../classes/mysql_connect.php');

$data = json_decode(file_get_contents("php://input"));

$email = mysql_escape_string(trim(strip_tags($data->username)));
$password = mysql_escape_string(trim(strip_tags($data->password))); //md5();

$query = "select 
                id,
                name,
                email,
                position,
                disabled,
                password,
                mobile,
                piclocation
            from users 
            where email = '$email'
                and disabled = 0";

$get = mysql_query($query);

if (!$get) {
    print('An error occurred while logging in. Please try again later.');
    exit();
}

if (mysql_num_rows($get) == 1) {
    while ($u = mysql_fetch_assoc($get)) {
        $resdata[] = $u;
        $pw = $u['password'];
    }

    if ($password == $pw) {
        print(json_encode($resdata));
        exit();    
    }
    
    print ('Invalid username or password.'); 
    exit();    
}
else {
    print ('Invalid username or password.');
    exit();
}


?>