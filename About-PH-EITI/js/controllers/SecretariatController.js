aboutApp.controller('SecretariatController',['$scope','AboutFactory',
	function($scope,AboutFactory){
	
	$scope.secretariat = AboutFactory.secretariat();
	
}]);