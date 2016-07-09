newsApp.controller('NewsletterController',['$scope','NewsFactory',
	function($scope,NewsFactory){
	
	$scope.years = []	
	var start = 2014, current = parseInt( (new Date()).getFullYear(), 10);
	for (var idx=current;idx>=start;idx--){
		$scope.years.push(idx);
	}
	$scope.filterYear = $scope.years[0];
	$scope.newsletter = NewsFactory.newsletter();

	$scope.open=function(link) {
		window.open(link)
	}

}]);