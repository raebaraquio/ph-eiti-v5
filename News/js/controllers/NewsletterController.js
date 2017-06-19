newsApp.controller('NewsletterController',['$scope','NewsFactory',
	function($scope,NewsFactory){
	try {
		ga('send', 'event', 'Pages', 'loaded', 'News : Newsletter');	
	}
	catch(gaError){
		console.log('GA - '+gaError)
	}

	$scope.years = [];
    $scope.newspromise = NewsFactory.newsletter();
    $scope.newspromise.then(function(response){
    	$scope.years = response.data.years;
    	$scope.filterYear = $scope.years[0];
    	$scope.newsletter = response.data.content;
        delete $scope.newspromise;
    },function(error){
        delete $scope.newspromise;
    });

	$scope.open=function(link,issue) {
		try {
			ga('send', 'event', 'Pages', 'loaded', 'Newsletter : '+issue.title);	
		}
		catch(gaError){
			console.log('GA - '+gaError)
		}
		window.open(link)
	}

}]);