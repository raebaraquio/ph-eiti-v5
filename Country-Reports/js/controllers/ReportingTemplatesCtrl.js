countryReportApp.controller('ReportingTemplatesCtrl',['$scope','CountryReportFactory','utilsService',
	function($scope,CountryReportFactory,utilsService){

	$scope.filterSector = 'Industry'; //'Government Agencies'
	$scope.filterYear = 2015;
	$scope.sectors = [];
	$scope.years = [];
	$scope.sectorTemplates = [];

	var folder = CountryReportFactory.reportingTemplates();
	$scope.templates = folder.subfolders;
	
	for (var k=0;k<$scope.templates.length;k++){
		$scope.years.push($scope.templates[k].year)
		var perYear = $scope.templates[k].subfolders;
		for (var kk=0;kk<perYear.length;kk++){
			if (utilsService.inArr($scope.sectors,perYear[kk].folder_name)===false){
				$scope.sectors.push(perYear[kk].folder_name)	
			}
		}
	}

	$scope.refreshTemplates = function(){
		for (var k=0;k<$scope.templates.length;k++){
			if ($scope.filterYear+''===$scope.templates[k].folder_name+'') {
				var selectedyear = $scope.templates[k].subfolders;
				for (var kk=0;kk<selectedyear.length;kk++) {
					if (selectedyear[kk].folder_name===$scope.filterSector) {
						$scope.sectorTemplates = selectedyear[kk].files
					}		
				}
			}
		}
	}

	$scope.refreshTemplates();

	$scope.open_file=function(src){
		window.open(src)
	}

}]);