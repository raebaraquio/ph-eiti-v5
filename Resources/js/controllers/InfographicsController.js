resourcesApp.controller('InfographicsController',['$scope','InfographicsFactory',
	function($scope,InfographicsFactory){
	try {
		ga('send', 'event', 'Pages', 'loaded', 'Resources : Infographics & Brochures');	
	}
	catch(gaError){
		console.log('GA - '+gaError)
	}
	$scope.filterContentType = 'Infographics'
	$scope.filterKeyword = ''
	$scope.years = []	

	var start = 2014, current = parseInt( (new Date()).getFullYear(), 10);
	for (var idx=current;idx>=start;idx--){
		$scope.years.push(idx);
	}

	$scope.filterYear = $scope.years[0];
	$scope.infoContent = InfographicsFactory.get();

	$scope.goto_file=function(link,file){
		if (link){
			try {
				ga('send', 'event', 'Files', 'opened', $scope.filterContentType+' ('+$scope.filterYear+') : '+file.title);	
			}
			catch(gaError){
				console.log('GA - '+gaError)
			}
			window.open('../'+link)
		}
	}

}]);