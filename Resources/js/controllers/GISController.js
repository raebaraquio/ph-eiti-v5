resourcesApp.controller('GISController',['$scope','ResourcesFactory','$location',
	function($scope,ResourcesFactory,$location){

	$scope.gis = ResourcesFactory.gis();
	$scope.selected_folder = {}

	$scope.goto_file = function(link) {
		if (link!=''){
			window.open('../'+link); //window.open('../../'+link)
		}
		else {
			alert('Document not yet available.')
		}
	}

	$scope.openFile=function(link){
		window.open(link)
	}

	$scope.openFolder=function(folder){
		$location.path('/GIS/'+folder)
	}

	$scope.$on('$routeChangeSuccess', function(){
		var loc = $location.path().split('/')
		var currloc = $location.path();
		if ($scope.gis) {
			for (var idx=0;idx<$scope.gis.subfolders.length;idx++){
				if ($scope.gis.subfolders[idx].folder_id===loc[loc.length-1]) {
					$scope.selected_folder = $scope.gis.subfolders[idx]
				}
			}
		}
    })

}]);