resourcesApp.controller('StudiesController',['$scope','ResourcesFactory',
	function($scope,ResourcesFactory){

	$scope.studies = ResourcesFactory.studies();

	$scope.goto_file = function(link) {
		if (link!=''){
			//window.open('../../'+link)
			window.open('../'+link)
		}
		else {
			alert('Document not yet available.')
		}
	}

}]);