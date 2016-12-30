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
	$scope.tabSelected = 1;

	$scope.refresh=function(){
		if ($scope.workPlans) {	
			for (var idx=0;idx<$scope.workPlans.length;idx++) {
				if ($scope.filterYear===$scope.workPlans[idx].year) {
					$scope.selected_workPlan = $scope.workPlans[idx];
					try {
						ga('send', 'event', 'Pages', 'loaded', 'Work Plan : '+$scope.selected_workPlan.title);	
					}
					catch(gaError){
						console.log('GA - '+gaError)
					}
				}
			}
			try	{
				if (window.location.href.match(/=/gi)) { 
					var query = window.location.href.split('=');
					if (query[0]==='roadmap') {
						$scope.tabSelected = 2;
					}
				}
			}
			catch(err){

			}
			
		}
	}

	$scope.refresh();

	$scope.preview = function(src,wplan) {
		try {
			ga('send', 'event', 'Files', 'opened', 'Work Plan and BO Roadmap : '+wplan.title);	
		}
		catch(gaError){
			console.log('GA - '+gaError)
		}
		window.open(src)
	}

}]);