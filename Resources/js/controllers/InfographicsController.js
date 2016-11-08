resourcesApp.controller('InfographicsController',['$scope','InfographicsFactory',
	function($scope,InfographicsFactory){
	$scope.filterContentType = 'Infographics'
	$scope.filterKeyword = ''
	$scope.years = []	

	var start = 2014, current = parseInt( (new Date()).getFullYear(), 10);
	for (var idx=current;idx>=start;idx--){
		$scope.years.push(idx);
	}

	$scope.filterYear = $scope.years[0];
	$scope.infoContent = InfographicsFactory.get();

	$scope.goto_file=function(link){
		if (link){
			window.open('../'+link)
		}
	}

}]);