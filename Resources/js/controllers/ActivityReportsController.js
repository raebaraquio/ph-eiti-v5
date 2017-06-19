resourcesApp.controller('ActivityReportsController',['$scope','$location','resourcesDataFactory',
	function($scope,$location,resourcesDataFactory){
	try {
		ga('send', 'event', 'Pages', 'loaded', 'Resources : Activity Reports');	
	}
	catch(gaError){
		console.log('GA - '+gaError)
	}

	$scope.getpromise = resourcesDataFactory.getAll('APR');
	$scope.getpromise.then(function(response){
		delete $scope.getpromise;
		$scope.activityReports = response.data;
	},function(err){
		delete $scope.getpromise;
	});

	$scope.goto_file = function(link) {
		if (link!=''){
			window.open('../'+link); //window.open('../../'+link)
		}
		else {
			alert('Document not yet available.')
		}
	}

	$scope.openFile=function(link,folder){
		try {
			ga('send', 'event', 'Files', 'opened', folder.title+' : '+folder.coverage);	
		}
		catch(gaError){
			console.log('GA - '+gaError)
		}
		window.open(link);
	}

}]);