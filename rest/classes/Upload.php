<?php
include_once('../classes/mysql_connect.php');

class Upload {
	// file type allowed
	// file size not max
	// folder destination
	// filename
	// attachment for
	
	protected $uploadType;
	protected $targetDirectory;
	protected $contentSection;
	protected $filename;
	protected $status;
	protected $mask;
	protected $domain;
	protected $host;

	public function getCurrYear(){
		return date('Y');
	}

	public function getCurrMonth(){
		return date('m');
	}

	public function getCurrDate(){
		return date('d');
	}

	public function createfilepath($uploadType,$contentSection,$filename,$fromCMS){
		$domain = $_SERVER["HTTP_ORIGIN"];
		$host = $_SERVER["HTTP_HOST"];
		/*if ($host=='localhost') {*/
			$domain = "../..";
		/*}*/
		if (isset($fromCMS) && $fromCMS==TRUE) {
			$domain = "../../..";
		}
		$targetDirectory = array('picture'=>array('Newsletter'=>$domain.'/app/News/images/newsletter-inlines',
												 'ActivityCover'=>$domain.'/images/_activities/cp/',
												 'HomeBanner'=>$domain.'/images/',
												 'Infographic'=>$domain.'/images/infographic',
												 'RelatedLink'=>$domain.'/images/related',
												 'Secretariat'=>$domain.'/images/secretariat'),
									 'document'=>array('Document'=>$domain.'/document',
												 'EITIReport'=>$domain.'/document/EITI-Report',
												 'Laws'=>$domain.'/document/Laws',
												 'MSGMeeting'=>$domain.'/document/msg-mtg',
												 'TWGMeeting'=>$domain.'/document/twg',
												 'Work-Plan'=>$domain.'/document/Work-Plan',
												 'GIS'=>$domain.'/filerepo/GIS',
												 'Brochure'=>$domain.'/filerepo/Brochures',
												 'Infographic'=>$domain.'/filerepo/Infographics',
												 'Reporting-Template'=>$domain.'/document/reporting-template',
												 'BO-Roadmap'=>$domain.'/document/BO-Roadmap'));	

		$path = $targetDirectory[$uploadType][$contentSection].'/'.self::getCurrYear().'/'.self::getCurrMonth().'/'.self::getCurrDate();
		$status = "";

		if ( file_exists($path) ) { }
		else {
			$mask = umask(0);
			if (!(mkdir($path, 0777, true)) ) {	
		    	$status = 'folderError';
		    	return array('status'=>$status,'path'=>$path.'/'.$filename,'folderdestination'=>$path);
		    	exit();
		    }
			umask($mask);
		}

		if (file_exists($path.'/'.$filename)) {
	    	$status = 'fileExists';
			return array('status'=>$status,'path'=>$path.'/'.$filename,'folderdestination'=>$path);
			exit();
	    }

		return array('status'=>'uploadReady',
					 'path'=>$path.'/'.$filename,
					 'folderdestination'=>$path);
		exit();
	}	
}

?>