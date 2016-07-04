resourcesApp.controller('ResourcesController',['$scope','ResourcesFactory',
	function($scope,ResourcesFactory){

	$scope.resourceContents = ResourcesFactory.content();

}]);