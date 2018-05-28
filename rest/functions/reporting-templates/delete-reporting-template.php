<?php 
require_once('../../classes/mysql_connect.php');

$id = NULL;
if (isset($_GET['id']) && $_GET['id']!==NULL) {
    $id = intval(mysql_escape_string(trim(strip_tags($_GET['id']))));
} 

if ($id==NULL || empty($id) || !(isset($id))) {
    print(
        json_encode(
    	    array(
                'success'=>false,
                'error'=>'no id found',
                'status'=>''
            )
    	)
    );
    exit();
}

$query = "delete from reporting_templates where rtid = ".$id;

$deleteResult = mysql_query($query);

if (!$deleteResult) {
    print(
        json_encode(
    	    array( 
                'success'=>false,
                'error'=>'database',
                'status'=>'selectError',
                'mysqlerror'=>mysql_error(),
                'query'=>$query
            )
    	)
    );
    exit();
}

print(json_encode(array('success'=>true,
                        'query'=>$query,
                        'status'=>'ok')));
exit();    

?>
