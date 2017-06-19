resourcesApp.controller('ResourcesController',['$scope','$location','resourcesDataFactory',
	function($scope,$location,resourcesDataFactory){
		
	$scope.getpromise = resourcesDataFactory.getContent();
	$scope.getpromise.then(function(response){
		delete $scope.getpromise;
		$scope.resourceContents = response.data.content;
	},function(err){
		delete $scope.getpromise;
	});

	try {
		ga('send', 'event', 'Pages', 'loaded', 'Resources');	
	}
	catch(gaError){
		console.log('GA - '+gaError)
	}

	$scope.openLink=function(href){
		window.location.href = '../Resources/#'+href
	}

}]);