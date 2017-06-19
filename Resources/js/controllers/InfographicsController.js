resourcesApp.controller('InfographicsController',['$scope','resourcesDataFactory',
	function($scope,resourcesDataFactory){
	try {
		ga('send', 'event', 'Pages', 'loaded', 'Resources : Infographics & Brochures');	
	}
	catch(gaError){
		console.log('GA - '+gaError)
	}
	
	$scope.filterContentType = 'Infographics';
	$scope.filterKeyword = '';
	$scope.years = [];
	$scope.infoContent = [];

	$scope.getpromise = resourcesDataFactory.getAll('Infographics');
	$scope.getpromise.then(function(response){
		delete $scope.getpromise;
		$scope.years = response.data.years;
		$scope.filterYear = $scope.years[0];
		$scope.infoContent = response.data.content;
	},function(err){
		delete $scope.getpromise;
	});

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