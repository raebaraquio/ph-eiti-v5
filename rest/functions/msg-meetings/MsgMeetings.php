<?php
require_once('../../classes/mysql_connect.php');

Class MsgMeetings{
	
	function __construct() {
		/**/
	}

    // Get
    
	function get_meetings(){
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

            print(json_encode(array('success'=>true,'meetings'=>$meetings)));
            exit();
        }
        else {
            print(json_encode(array('success'=>true,'meetings'=> array())));
            exit();    
        }
        
	}

	// Delete
    function delete_msg_meeting_annexes($id){
		if ($id==NULL || empty($id)){
			return 0;
        }
        
		$query = "delete from msg_meetings_file_annexes where mtgid_fk=".$id;

        $deleteResult = mysql_query($query);

        if (!$deleteResult) {
            return 0;
        }

        return 1;
	}

	function delete_msg_meeting($id){

        if ($id==NULL || empty($id)){
			print(json_encode(
            		array(
            		'success'=>false,
                    'error'=>'no id found',
                    'status'=>'',
                    'query'=>'')
            	)
            );
            exit();
        }

        $deleted_annexes = self::delete_msg_meeting_annexes($id);

        if ($deleted_annexes==0){
			print(json_encode(
					array(
						'success'=>false,
						'error'=>'db delete error',
						'status'=>'',
						'query'=>''
					)
				)
			);
			exit();
		}

		$query = "delete from msg_meetings where mtgid =".$id;

        $deleteResult = mysql_query($query);

        if (!$deleteResult) {
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

        print(json_encode(
            array(
                'success'=>true,
                'query'=>$query,
                'status'=>'ok')
            )
        );
        exit();
	}

    function delete_msg_minutes($id) {
        if ($id==NULL || empty($id)){
            print(json_encode(
                    array(
                        'success'=>false,
                        'error'=>'no id',
                        'status'=>'',
                        'query'=>''
                    )
                )
            );
            exit();
        }
        
        $query = "update msg_meetings set minutes_url = NULL where mtgid=".$id;

        $deleteResult = mysql_query($query);

        if (!$deleteResult) {
            print(json_encode(
                    array(
                        'success'=>false,
                        'error'=>'db delete error',
                        'status'=>'',
                        'query'=>''
                    )
                )
            );
            exit();
        }

        print(json_encode(
            array(
                'success'=>true,
                'query'=>$query,
                'status'=>'ok')
            )
        );
        exit();
    }

    function delete_annex($id,$annex_id){
        if ($id==NULL || empty($id)){
            print(json_encode(
                    array(
                        'success'=>false,
                        'error'=>'no id',
                        'status'=>'',
                        'query'=>''
                    )
                )
            );
            exit();
        }

        if ($annex_id==NULL || empty($annex_id)){
            print(json_encode(
                    array(
                        'success'=>false,
                        'error'=>'no id',
                        'status'=>'',
                        'query'=>''
                    )
                )
            );
            exit();
        }
        
        $query = "delete from msg_meetings_file_annexes where mtgid_fk=".$id." and annex_id =".$annex_id;

        $deleteResult = mysql_query($query);

        if (!$deleteResult) {
            print(json_encode(
                    array(
                        'success'=>false,
                        'error'=>'db delete error',
                        'status'=>'',
                        'query'=>''
                    )
                )
            );
            exit();
        }

        print(json_encode(
            array(
                'success'=>true,
                'query'=>$query,
                'status'=>'ok')
            )
        );
        exit();
    }
}

?>