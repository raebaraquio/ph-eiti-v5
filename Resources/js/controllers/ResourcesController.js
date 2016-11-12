resourcesApp.controller('ResourcesController',['$scope','ResourcesFactory','$location',
	function($scope,ResourcesFactory,$location){

	$scope.resourceContents = ResourcesFactory.content();
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