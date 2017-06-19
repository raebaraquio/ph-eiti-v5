resourcesApp.controller('StudiesController',['$scope','resourcesDataFactory',
	function($scope,resourcesDataFactory){

	try {
		ga('send', 'event', 'Pages', 'loaded', 'Resources : Studies');	
	}
	catch(gaError){
		console.log('GA - '+gaError)
	}

	
	$scope.filterKeyword = '';
	$scope.years = [];

	$scope.getpromise = resourcesDataFactory.getAll('Studies');
	$scope.getpromise.then(function(response){
		delete $scope.getpromise;
		$scope.years = response.data.years;
		$scope.filterYear = $scope.years[0];
		$scope.studies = response.data.studies;
	},function(err){
		delete $scope.getpromise;
	});

	$scope.goto_file = function(link,file) {
		if (link!=''){
			try {
				ga('send', 'event', 'Files', 'opened', 'Studies ('+$scope.filterYear+') : '+file.title);	
			}
			catch(gaError){
				console.log('GA - '+gaError)
			}
			window.open('../'+link)
		}
		else {
			alert('Document not yet available.')
		}
	}

}]);