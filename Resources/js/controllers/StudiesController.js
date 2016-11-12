resourcesApp.controller('StudiesController',['$scope','ResourcesFactory',
	function($scope,ResourcesFactory){
	try {
		ga('send', 'event', 'Pages', 'loaded', 'Resources : Studies');	
	}
	catch(gaError){
		console.log('GA - '+gaError)
	}
	$scope.studies = ResourcesFactory.studies();
	$scope.filterKeyword = ''
	$scope.years = []	

	var start = 2014, current = parseInt( (new Date()).getFullYear(), 10);
	for (var idx=current;idx>=start;idx--){
		$scope.years.push(idx);
	}

	$scope.filterYear =  2015; //$scope.years[0];

	$scope.goto_file = function(link,file) {
		if (link!=''){
			try {
				ga('send', 'event', 'Files', 'opened', 'Studies ('+$scope.filterYear+') : '+file.title);	
			}
			catch(gaError){
				console.log('GA - '+gaError)
			}
			window.open('../'+link)
		}
		else {
			alert('Document not yet available.')
		}
	}

}]);