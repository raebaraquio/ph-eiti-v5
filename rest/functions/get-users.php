<?php
include_once('../classes/mysql_connect.php');

$query = "select 
                id,
                name,
                email,
                position,
                disabled,
                password
            from users 
            where disabled = 0";

$get = mysql_query($query);

if (!$get) {
    print('An error occurred while logging in. Please try again later.');
    exit();
}

while ($u = mysql_fetch_assoc($get)) {
    $resdata[] = $u;
}

print(json_encode($resdata));
exit();    



?>