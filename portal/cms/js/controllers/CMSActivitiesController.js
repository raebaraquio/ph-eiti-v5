cms.controller('CMSActivitiesController',['$scope',
	function($scope){

	if (!sessionStorage.getItem('id')) {
		window.location.href = '../../portal/';
	}

	$scope.user = {
		id:sessionStorage.getItem('id'),
		name:sessionStorage.getItem('name'),
		position:sessionStorage.getItem('position'),
		email:sessionStorage.getItem('email'),
		mobile:sessionStorage.getItem('mobile'),
		piclocation:sessionStorage.getItem('piclocation')
	}
	
	if ($scope.user.mobile === undefined) {
		$scope.user.mobile = ''	
	}

	$scope.contentTypes = ["Home","News","Documents","Activities","Announcements","Infographics"]
	$scope.selectedContent = "Activities"

}])
