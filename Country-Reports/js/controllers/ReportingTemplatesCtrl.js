countryReportApp.controller('ReportingTemplatesCtrl',['$scope','CountryReportFactory',
	function($scope,CountryReportFactory){

	$scope.filterSector = 'Industry'; //'Government Agencies'
	$scope.sectors = []

	var folder = CountryReportFactory.reportingTemplates();
	$scope.templates = folder.subfolders
	$scope.sectorTemplates = []

	for (var k=0;k<$scope.templates.length;k++){
		$scope.sectors.push($scope.templates[k].folder_name)
	}

	$scope.refreshTemplates = function(){
		for (var k=0;k<$scope.templates.length;k++){
			if ($scope.templates[k].folder_name===$scope.filterSector) {
				$scope.sectorTemplates = $scope.templates[k].files
			}
		}
	}

	$scope.refreshTemplates();

	$scope.open_file=function(src){
		window.open(src)
	}

}]);