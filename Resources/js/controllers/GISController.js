resourcesApp.controller('GISController',['$scope','$location','resourcesDataFactory',
	function($scope,$location,resourcesDataFactory){
	try {
		ga('send', 'event', 'Pages', 'loaded', 'Resources : General Information Sheet');	
	}
	catch(gaError){
		console.log('GA - '+gaError)
	}

	$scope.filterKeyword = '';
	$scope.years = [];

	$scope.getpromise = resourcesDataFactory.getAll('GIS');
	$scope.getpromise.then(function(response){
		delete $scope.getpromise;
		$scope.years = response.data.years;
		$scope.filterYear = $scope.years[0];
		$scope.gis = response.data.gis;
	},function(err){
		delete $scope.getpromise;
	});

	$scope.openFile=function(link,folder){
		try {
			ga('send', 'event', 'Files', 'opened', 'General Information Sheet ('+$scope.filterYear+') : '+folder.title);	
		}
		catch(gaError){
			console.log('GA - '+gaError)
		}
		window.open('../'+link)
	}

}]);