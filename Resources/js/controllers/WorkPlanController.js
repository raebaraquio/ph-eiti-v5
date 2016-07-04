resourcesApp.controller('WorkPlanController',['$scope','ResourcesFactory',
	function($scope,ResourcesFactory){

	$scope.filterYear = ''
	$scope.years = [];
	
	$scope.workPlans = ResourcesFactory.workPlan();
	for (var idx=0;idx<$scope.workPlans.length;idx++) {
		$scope.years.push($scope.workPlans[idx].year);
	}

	$scope.filterYear = $scope.years[0]
	$scope.selected_workPlan = {}

	$scope.refresh=function(){
		if ($scope.workPlans) {	
			for (var idx=0;idx<$scope.workPlans.length;idx++) {
				if ($scope.filterYear===$scope.workPlans[idx].year) {
					$scope.selected_workPlan = $scope.workPlans[idx];
				}
			}
		}
	}

	$scope.refresh();

}]);