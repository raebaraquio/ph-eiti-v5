cms.controller('CMSController',['$scope','sessionService',
	function($scope,sessionService){
	
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
	$scope.tasks = [
		{
			task:'Manage News',
			href:'#/News',
			desc:'Create news articles here',
			icon: '../../images/icons/svg/ic_local_library_black_24px.svg'
			// You may publish the article right away or just save it as a draft.'
		},
		{
			task:'Manage Resources',
			href:'#/Resources',
			desc:'Lets you upload documents under Resources',
			icon: '../../images/icons/svg/ic_insert_drive_file_black_24px.svg'
			// like Work Plan, Activity Reports, Laws, Infographics & Brochures, Organizational Documents, and General Information Sheet.'
		},
		{
			task:'Manage Activities',
			href:'#/Activities',
			desc:'Create a new or update existing activity',
			icon: '../../images/icons/svg/ic_event_black_24px.svg'
		},
		{
			task:'Manage Country Report',
			href:'#/Country Report',
			desc:'Update content or documents of Country Reports',
			icon: '../../images/icons/svg/ic_class_black_24px.svg'
		},
		{
			task:'Log out',
			href:'../../login',
			desc:'Exit Content Manager Portal',
			icon: '../../images/icons/svg/ic_power_settings_new_black_24px.svg'
		}
	]

}]);
