<?php 
require_once('../../classes/mysql_connect.php');

$query = "SELECT 
			YEAR(activity_start_date) as yr 
		FROM activities 
		group by yr 
		order by yr desc";

$getResult = mysql_query($query);

if (!$getResult) {
    print(json_encode(
    	array(
    		'success'=>false,
            'error'=>'database',
            'status'=>'selectError',
            'mysqlerror'=>mysql_error(),
            'query'=>$query)
    	)
    );
    exit();
}

if (mysql_num_rows($getResult) > 0) {

	$yearsData = array();
    while ($res = mysql_fetch_assoc($getResult)) {
    	array_push($yearsData, intval($res['yr']));
    }
  	print(json_encode(array('success'=>true,
				 'years'=>$yearsData)));
    exit();
}
else {
    print(json_encode(array('success'=>true,
				 'years'=> array())));
    exit();    
}

?>
