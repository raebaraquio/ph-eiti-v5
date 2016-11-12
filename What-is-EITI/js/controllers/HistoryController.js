wieApp.controller('HistoryController',['$scope','HistoryFactory',
	function($scope,HistoryFactory){

	$scope.events = HistoryFactory.get();
	
	try {
		ga('send', 'event', 'Pages', 'loaded', 'What is EITI : History'); 
	}
	catch(gaError){
		console.log('GA - '+gaError)
	}
}]);