resourcesApp.controller('StudiesController',['$scope','ResourcesFactory',
	function($scope,ResourcesFactory){

	$scope.studies = ResourcesFactory.studies();
	$scope.filterKeyword = ''
	$scope.years = []	

	var start = 2014, current = parseInt( (new Date()).getFullYear(), 10);
	for (var idx=current;idx>=start;idx--){
		$scope.years.push(idx);
	}

	$scope.filterYear =  2015; //$scope.years[0];

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