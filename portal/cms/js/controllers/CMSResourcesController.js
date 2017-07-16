angular
		.module('cms')
		.factory('ResourcesDataFactory`',ResourcesDataFactory)
		.controller('CMSResourcesController',CMSActivitiesController);

	ResourcesDataFactory.$inject = ['$http']
	function ResourcesDataFactory($http){

		var ResourcesDataFactory = {
			get: get
		};
		return ResourcesDataFactory;
		
		///////////////////////////////

		function get(){
			return $http({
	            url:'../../rest/functions/cms-resources/get.php',
	            method: 'GET'
	        });
		}
	}

	CMSResourcesController.$inject = ['$scope','ResourcesDataFactory']
	function CMSResourcesController($scope,ResourcesDataFactory){
		// if (!sessionStorage.getItem('id')) {
		// 	window.location.href = '../../portal/';
		// }
		
		$scope.resources = [];
		
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



		$scope.promise = ResourcesDataFactory.get();
		$scope.promise.then(function(response){
			console.log(response)
			$scope.activities = response.data.data;
			delete $scope.promise
		},function(err){
			delete $scope.promise
		});
	}