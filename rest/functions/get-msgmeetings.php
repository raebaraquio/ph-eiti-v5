<?php 
require_once('../classes/mysql_connect.php');
$query = "select
			mtgid,
			mtg_title,
			mtg_date,
			mtg_venue,
			mtg_time,
			minutes_url,
			with_annex,
			date_added,
			date_last_updated,
			(
				select
					GROUP_CONCAT(CONCAT(annex_id, '~~~', title , '~~~', file_url) SEPARATOR '---') AS items
				from msg_meetings_file_annexes
				where mtgid_fk = msg_meetings.mtgid
			) as meeting_annexes
		from msg_meetings";

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

    while ($res = mysql_fetch_assoc($getResult)) {
        $meetings[] = $res;
    }

  	print(json_encode(array('success'=>true,
				 'meetings'=>$meetings)));
    exit();
}
else {
    print(json_encode(array('success'=>true,
				 'meetings'=> array())));
    exit();    
}
?>
