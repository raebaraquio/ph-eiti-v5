wieApp.controller('HistoryController',['$scope','WIEDataFactory',
	function($scope,WIEDataFactory){
	try {
		ga('send', 'event', 'Pages', 'loaded', 'What is EITI : History'); 
	}
	catch(gaError){
		console.log('GA - '+gaError)
	}

	$scope.getPromise = WIEDataFactory.getHistory();
	$scope.getPromise.then(function(response){
	    if (response.data.content) {
	        $scope.events = response.data.content;
	    }
	    delete $scope.getPromise;
	},function(error){
	    console.log(error)
	    delete $scope.getPromise;
	});
	
}]);