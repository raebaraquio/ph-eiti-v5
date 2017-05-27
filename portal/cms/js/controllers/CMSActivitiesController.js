(function(){
	angular
		.module('cms')
		.factory('ActivitiesDataFactory',ActivitiesDataFactory)
		.controller('CMSActivitiesController',CMSActivitiesController);

	ActivitiesDataFactory.$inject = ['$http']
	function ActivitiesDataFactory($http){

		var ActivitiesDataFactory = {
			get: get
		};
		return ActivitiesDataFactory;
		
		///////////////////////////////

		function get(){
			return $http({
	            url:'../../rest/functions/cms-activities/get.php',
	            method: 'GET'
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
		$scope.years = [];
		var start = 2013, current = parseInt( (new Date()).getFullYear(), 10);
		for (var idx=current;idx>=start;idx--){
			$scope.years.push(idx);
		}

		$scope.filterYear = $scope.years[0];
		$scope.filterKeyword = '';

		$scope.promise = ActivitiesDataFactory.get();
		$scope.promise.then(function(response){
			console.log(response)
			$scope.activities = response.data.data;
			delete $scope.promise
		},function(err){
			delete $scope.promise
		});
	}
})();
