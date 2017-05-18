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
			task:'Add/Edit/Publish News',
			href:'#/News',
			desc:'Create news articles here'
			// You may publish the article right away or just save it as a draft.'
		},
		{
			task:'Upload Resources',
			href:'#/Resources',
			desc:'Lets you upload documents under Resources'
			// like Work Plan, Activity Reports, Laws, Infographics & Brochures, Organizational Documents, and General Information Sheet.'
		},
		{
			task:'Manage Activities',
			href:'#/Activities',
			desc:'Create a new or update existing activity'
		},
		{
			task:'Update Country Report',
			href:'#/Country Report',
			desc:'Update content or documents of Country Reports'
		},
		{
			task:'Log out',
			href:'../login',
			desc:''
		}
	]

}]);
