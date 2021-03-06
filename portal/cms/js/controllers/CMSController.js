cms.controller('CMSController',['$scope','sessionService','$location','$rootScope',
	function($scope,sessionService,$location,$rootScope){
	
	if (sessionService.inSession()===false) {
		window.location.href = '../../portal/';
	}

	$scope.user = {
		id:sessionService.userProperty('id'),
		name:sessionService.userProperty('name'),
		position:sessionService.userProperty('position'),
		email:sessionService.userProperty('email'),
		mobile:sessionService.userProperty('mobile'),
		piclocation:sessionService.userProperty('piclocation')
	}

	if ($scope.user.mobile === undefined) {
		$scope.user.mobile = ''	
	}

	// $scope.contentTypes = ["Home","News","Documents","Activities","Announcements","Infographics"]
	$scope.selectedContent = "Home";
	$scope.activeNav = "";
	$scope.tasks = [
		{
			task:'News',
			href:'#/News',
			desc:'Create news articles here',
			icon: '../../images/icons/svg/ic_local_library_black_24px.svg'
			// You may publish the article right away or just save it as a draft.'
		},
		{
			task:'Resources',
			href:'#/Resources',
			desc:'Upload documents under Resources',
			icon: '../../images/icons/svg/ic_insert_drive_file_black_24px.svg'
			// like Work Plan, Activity Reports, Laws, Infographics & Brochures, Organizational Documents, and General Information Sheet.'
		},
		{
			task:'Activities',
			href:'#/Activities',
			desc:'Create a new or update existing activity',
			icon: '../../images/icons/svg/ic_event_black_24px.svg'
		},
		{
			task:'MSG Meetings',
			href:'#/MSG Meetings',
			desc:'Add and/or Update MSG Meetings',
			icon: '../../images/icons/svg/ic_event_black_24px.svg'
		},
		{
			task:'MSG Members',
			href:'#/MSG Members',
			desc:'Add and/or Update MSG Members',
			icon: '../../images/icons/svg/ic_event_black_24px.svg'
		},
		{
			task:'Reporting Templates',
			href:'#/Reporting Templates',
			desc:'Upload Reporting Templates',
			icon: '../../images/icons/svg/ic_class_black_24px.svg'
		},
		{
			task:'Country Report',
			href:'#/Country Report',
			desc:'Update content or documents of Country Reports',
			icon: '../../images/icons/svg/ic_class_black_24px.svg'
		},
		{
			task:'Secretariat',
			href:'#/Secretariat',
			desc:'Add and/or update secretariat info/accounts',
			icon: '../../images/icons/svg/ic_event_black_24px.svg'
		},
		{
			task:'Log out',
			href:'../../portal/login',
			desc:'Exit Content Manager Portal',
			icon: '../../images/icons/svg/ic_power_settings_new_black_24px.svg'
		},
		{
			task:'Go to PH-EITI webite',
			href:'../../',
			desc:'',
			icon: '../../images/icons/svg/ic_home_black_24px.svg'
		}
	]

	$rootScope.$on('$routeChangeSuccess', function(next, current) { 
		if (current) {
			$scope.activeNav = current.$$route.activenav;	
		}
	});

	$scope.openManual=function(){
		window.open('../../document/System Manual/PH-EITI_Portal_-_Content-Manager_v1.pdf');
	}
}]);
