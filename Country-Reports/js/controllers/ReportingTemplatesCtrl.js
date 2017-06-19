countryReportApp.controller('ReportingTemplatesCtrl',['$scope','utilsService','dataFactory',
	function($scope,utilsService,dataFactory){

	try {
		ga('send', 'event', 'Pages', 'loaded', 'Country Reports : Reporting Templates');	
	}
	catch(gaError){
		console.log('GA - '+gaError)
	}

	$scope.sectors = [];
	$scope.years = [];
	$scope.sectorTemplates = [];

	$scope.getpromise = dataFactory.getReportingTemplates();
	$scope.getpromise.then(function(response){
		delete $scope.getpromise;
	
		$scope.sectors = response.data.sectors;
		$scope.filterSector = 'Industry';

		$scope.years = response.data.years;
		$scope.filterYear = $scope.years[0];

		$scope.templates = response.data.templates;
		
	},function(err){
		delete $scope.getpromise;
	});

	$scope.open_file=function(src,file){
		try {
			ga('send', 'event', 'Files', 'opened', "Reporting Templates ("+$scope.filterYear+") : "+file.title);	
		}
		catch(gaError){
			console.log('GA - '+gaError)
		}
		window.open(src)
	}

}]);