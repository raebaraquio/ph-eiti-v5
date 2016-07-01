activitiesApp.controller('ActivitiesController',['$scope',
	function($scope){

	$scope.activites = []
	$scope.years = []
	$scope.filterYear = ''
	$scope.filterKeyword = ''

	var start = 2012, current = parseInt( (new Date()).getFullYear(), 10);
	for (var idx=current;idx>=start;idx--){
		$scope.years.push(idx);
	}

	$scope.refreshActivites=function(){

	}

}]);