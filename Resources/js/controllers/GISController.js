resourcesApp.controller('GISController',['$scope','ResourcesFactory','$location',
	function($scope,ResourcesFactory,$location){

	$scope.gis = ResourcesFactory.gis();
	$scope.selected_folder = {}

	$scope.years = []	
	var start = 2012, current = parseInt( (new Date()).getFullYear(), 10);
	for (var idx=current;idx>=start;idx--){
		$scope.years.push(idx);
	}
	$scope.filterYear = $scope.years[0]-1;
	$scope.filterKeyword = ''

	$scope.refreshList=function(){
		$scope.selected_folder = {}
		for (var idx=0;idx<$scope.gis.subfolders.length;idx++){
			if ($scope.gis.subfolders[idx].year===parseInt($scope.filterYear,10)) {
				$scope.selected_folder = $scope.gis.subfolders[idx]
			}
		}		
	}

	$scope.refreshList();

	$scope.openFile=function(link){
		window.open('../'+link)
	}

}]);