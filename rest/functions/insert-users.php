<?php
include_once('../classes/mysql_connect.php');

$default = 'pheiti123#';//md5();

$query = "insert into users
                (name,
                position,
                email,
                id,
                password)
            values
                ('Maria Karla Espinosa','National Coordinator','mklespinosa@gmail.com','mklespinosa','".$default."'),
                ('Roselyn Salagan','Communications Officer','fencesitter1118@gmail.com','rsalagan','".$default."'),
                ('Joylin Saquing','Outreach Officer','joylinsaquing@gmal.com','jsaquing',".$default."'),
                ('Johna Paula Manzano','Office Manager','','jpmanzano','".$default."'),
                ('Leah Ivy Manzanero','Technical Specialist','','limanzanero','".$default."'),
                ('Ryan Justin Dael','Data Visualization Specialist','','rdael','".$default."'),
                ('Rhoda Aranco','Project Finance Associate','','radaranco','".$default."'),
                ('Rhea Mae Bagacay','Procurement Assistant','','rbagacay','".$default."');";


$insert = mysql_query($query);

if (!$insert) {
    // print('An error occurred while logging in. Please try again later.');
    print(mysql_error());
    exit();
}

print('Inserted');
exit(); 

?>
