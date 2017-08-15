(function(){
	angular
		.module('cms')
		.filter('formatDate',formatDate)
		.factory('ActivitiesDataFactory',ActivitiesDataFactory)
		.controller('CMSActivitiesController',CMSActivitiesController);

	function formatDate(){
        return function(input) {
           return moment(input).format('LL')
        };
    } 

	ActivitiesDataFactory.$inject = ['$http']
	function ActivitiesDataFactory($http){

		var ActivitiesDataFactory = {
			get: get,
			getOne: getOne,
			getAll: getAll,
			getYears: getYears
		};
		return ActivitiesDataFactory;
		
		///////////////////////////////

		function get(){
			return $http({
	            url:'../../rest/functions/cms-activities/get.php',
	            method: 'GET'
	        });
		}

		function getAll(year){
			var year = year ? '?year='+year : '';
			return $http({
				url:'../../rest/functions/activities/getAll.php'+year,
				method:'GET'
			});
		}

		function getOne(id){
			var id = id ? '?id='+id : '';
			return $http({
				url:'../../rest/functions/activities/getOne.php'+id,
				method:'GET'
			});
		}

		function getYears(){
			return $http({
				url:'../../rest/functions/activities/getYears.php',
				method:'GET'
			});
		}
	}

	CMSActivitiesController.$inject = ['$scope','ActivitiesDataFactory']
	function CMSActivitiesController($scope,ActivitiesDataFactory){
		// if (!sessionStorage.getItem('id')) {
		// 	window.location.href = '../../portal/';
		// }
		$scope.user = {
			id:sessionStorage.getItem('id'),
			name:sessionStorage.getItem('name'),
			position:sessionStorage.getItem('position'),
			email:sessionStorage.getItem('email'),
			mobile:sessionStorage.getItem('mobile'),
			piclocation:sessionStorage.getItem('piclocation')
		}
		
		if ($scope.user.mobile === undefined) {
			$scope.user.mobile = ''	
		}

		$scope.activities = [];
		$scope.filterKeyword = '';

		function getYears(){
			$scope.years = [];
			$scope.getpromise = ActivitiesDataFactory.getYears();
			$scope.getpromise.then(function(response){
				delete $scope.getpromise;
				$scope.years = response.data.years;
				$scope.filterYear = $scope.years[0];
				// getActivities(true);
			},function(err){
				delete $scope.getpromise;
			});
		}

		function getActivities(mode){
			if (mode===true) {
				$scope.getpromise = ActivitiesDataFactory.getAll($scope.filterYear);	
			}
			else {
				var id = $location.path().split('/')[1];
				$scope.getpromise = ActivitiesDataFactory.getOne(id);
			}
			$scope.getpromise.then(function(response){
				$scope.activities = response.data;
				console.log($scope.activities)
				delete $scope.getpromise;
			},function(err){
				delete $scope.getpromise;
			});
		}
		$scope.$watch('filterYear',function(v){
			if (v) {
				getActivities(true)
			}
		})
		
		getYears(true);
	}
})();
