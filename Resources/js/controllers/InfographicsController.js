resourcesApp.controller('InfographicsController',['$scope','InfographicsFactory',
	function($scope,InfographicsFactory){
	$scope.filterContentType = 'Infographics'
	$scope.filterKeyword = ''

	$scope.infoContent = InfographicsFactory.get();

	$scope.goto_file=function(link){
		if (link){
			window.open('../'+link)
		}
	}

}]);