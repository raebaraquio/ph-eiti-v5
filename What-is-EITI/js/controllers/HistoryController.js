wieApp.controller('HistoryController',['$scope','HistoryFactory',
	function($scope,HistoryFactory){

	$scope.events = HistoryFactory.get();
	
}]);