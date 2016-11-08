resourcesApp.controller('ResourcesController',['$scope','ResourcesFactory','$location',
	function($scope,ResourcesFactory,$location){

	$scope.resourceContents = ResourcesFactory.content();

	$scope.openLink=function(href){
		window.location.href = '../Resources/#'+href
	}

}]);