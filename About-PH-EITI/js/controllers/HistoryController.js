aboutApp.controller('HistoryController',['$scope','dataFactory','utilsService',
	function($scope,dataFactory,utilsService){
	
	try {
		ga('send', 'event', 'Pages', 'loaded', 'About PH-EITI : History');	
	}
	catch(gaError){
		console.log('GA - '+gaError)
	}

	$scope.years = [];
    $scope.getPromise = dataFactory.getHistory();
    $scope.getPromise.then(function(response){
        if (response.data.content) {
            $scope.events = response.data.content;
            for (var idx=0;idx<$scope.events.length;idx++){
                if (utilsService.inArr($scope.years,$scope.events[idx].year)===false) {
                    $scope.years.push($scope.events[idx].year)
                }
            }
        }
        delete $scope.getPromise;
    },function(error){
        console.log(error)
        delete $scope.getPromise;
    });

}]);