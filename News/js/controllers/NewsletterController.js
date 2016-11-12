newsApp.controller('NewsletterController',['$scope','NewsFactory',
	function($scope,NewsFactory){
	try {
		ga('send', 'event', 'Pages', 'loaded', 'News : Newsletter');	
	}
	catch(gaError){
		console.log('GA - '+gaError)
	}
	$scope.years = []	
	var start = 2014, current = parseInt( (new Date()).getFullYear(), 10);
	for (var idx=current;idx>=start;idx--){
		$scope.years.push(idx);
	}
	$scope.filterYear = $scope.years[0];
	$scope.newsletter = NewsFactory.newsletter();

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