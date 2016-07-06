resourcesApp.controller('ActivityReportsController',['$scope','ResourcesFactory','$location',
	function($scope,ResourcesFactory,$location){

	$scope.activityReports = ResourcesFactory.activityReports();
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
		$location.path('/Activity-Reports/'+folder)
	}

	$scope.$on('$routeChangeSuccess', function(){
		var loc = $location.path().split('/')
		var currloc = $location.path();
		if ($scope.orgdocs) {
			for (var idx=0;idx<$scope.orgdocs.subfolders.length;idx++){
				if ($scope.orgdocs.subfolders[idx].folder_id===loc[loc.length-1]) {
					$scope.selected_folder = $scope.orgdocs.subfolders[idx]
				}
			}
		}
    })

}]);