cms.controller('CMSAnnouncementsController',['$scope','sessionService',
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

	$scope.contentTypes = ["Home","News","Documents","Activities","Announcements","Infographics"]
	$scope.selectedContent = "Announcements"

}])
