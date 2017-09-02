(function(){
	'use strict';

	angular
		.module('activities')
		.filter('formatDate',formatDate)
		.factory('activitiesHttpFactory',activitiesHttpFactory)
		.controller('ActivitiesController',ActivitiesController);
	
	function formatDate(){
		return function(input) {
	       return moment(input).format('LL')
	    };
	}		

	activitiesHttpFactory.$inject = ['$http'];
	function activitiesHttpFactory($http) {
		
		var activitiesHttpFactory = {
			getYears : getYears,
			getAll : getAll,
			getOne : getOne
		}

		return activitiesHttpFactory;

		/////// 

		function getYears(){
			return $http({
				url:'../rest/functions/activities/getYears.php',
				method:'GET'
			});
		}

		function getAll(year){
			var year = year ? '?year='+year : '';
			return $http({
				url:'../rest/functions/activities/getAll.php'+year,
				method:'GET'
			});
		}

		function getOne(id){
			var id = id ? '?id='+id : '';
			return $http({
				url:'../rest/functions/activities/getOne.php'+id,
				method:'GET'
			});
		}

	}

	ActivitiesController.$inject = ['$scope','$sce','$location','activitiesHttpFactory'];
	function ActivitiesController($scope,$sce,$location,activitiesHttpFactory){
		$scope.activites = [];
		$scope.years = [];
		$scope.filterKeyword = ''

		$scope.activity = {};
		$scope.active_activity_tab = '';

		$scope.select_act_tab = function(tab){
			$scope.active_activity_tab = tab;
		}
		
		$scope.type_of_doc = function(d) {
			return typeof(d);
		}

		$scope.get = {
			years: function(){
				$scope.years = [];
				$scope.getpromise = activitiesHttpFactory.getYears();
				$scope.getpromise.then(function(response){
					delete $scope.getpromise;
					$scope.years = response.data.years;
					$scope.filterYear = $scope.years[0];
					$scope.get.activities(true);
				},function(err){
					delete $scope.getpromise;
				});
			},
			activities : function(mode) {
				
				$scope.activity = {};
				$scope.activities = [];
				$scope.no_content_elem = false;

				if (mode===true) {
					$scope.getpromise = activitiesHttpFactory.getAll($scope.filterYear);	
				}
				else {
					var id = $location.path().split('/')[1];
					$scope.getpromise = activitiesHttpFactory.getOne(id);
				}
				$scope.getpromise.then(function(response){
					delete $scope.getpromise;
					if (mode === true) {
						try {
					        ga('send', 'event', 'Pages', 'loaded', 'Activities'); 
					    }
					    catch(gaError){
					        console.log('GA - '+gaError)
					    }
						$scope.activities = response.data;	
					}
					else { // For Single Activity View
						try {
							$scope.activity = response.data;
							try {
						        ga('send', 'event', 'Pages', 'loaded', 'Activities - '+$scope.activity.title); 
						    }
						    catch(gaError){
						        console.log('GA - '+gaError)
						    }

							if ($scope.activity.writeup_content == null && 
								$scope.activity.program_url == null && 
								$scope.activity.documentation_url == null  && 
								$scope.activity.presentations.length == 0  &&
								$scope.activity.gallery.length == 0) {
								$scope.no_content_elem = true;
							}

							if ($scope.activity.writeup_content != null) {
								$scope.activity.writeup_content = $sce.trustAsHtml('<div>'+$scope.activity.writeup_content+'</div>');		
							}

							if ($scope.activity.program_url) {
								$scope.activity.program_url = '../'+$scope.activity.program_url;
							}

							if ($scope.activity.documentation_url) {
								if (typeof($scope.activity.documentation_url)==='string') {
									$scope.activity.documentation_url = '../'+$scope.activity.documentation_url; // '../../'	
								}
								// else {
								// 	if ($scope.activity.documentation.length) {
								// 		if ($scope.activity.documentation[0]) {
								// 			$scope.activity.documentation[0] = '../'+$scope.activity.documentation[0]; // '../../'
								// 		}
								// 		if ($scope.activity.documentation[1]) {
								// 			$scope.activity.documentation[1] = '../'+$scope.activity.documentation[1]; // '../../'
								// 		}
								// 	}	
								// }							
							}

							var presentations = [];
							if ($scope.activity.presentations.length > 0) {
								var currDay = ''
								for (var p=0;p<$scope.activity.presentations.length;p++){
									if (currDay!==$scope.activity.presentations[p].event_day_str){
										currDay = $scope.activity.presentations[p].event_day_str
										presentations.push({
											eventDay : currDay,
											presentations: []
										})
									}
									presentations[presentations.length-1].presentations.push({
										title:$scope.activity.presentations[p].presentation_title,
										author:$scope.activity.presentations[p].presentation_author,
										src:$scope.activity.presentations[p].presentation_url
									})
								}
							}
							$scope.activity.presentations = angular.copy(presentations)

							if ($scope.activity.writeup_content !== null) {
								$scope.select_act_tab('About')
								return
							}

							if ($scope.activity.program_url !== null) {
								$scope.select_act_tab('Program')
								return
							}

							if ($scope.activity.documentation_url !== null) {
								$scope.select_act_tab('Documentation')
								return
							}

							if ($scope.activity.presentations.length > 0) {
								$scope.select_act_tab('Presentations')
								return
							}

							if ($scope.activity.gallery.length > 0) {
								$scope.select_act_tab('Gallery')
								return
							}

						}
						catch(err){}
					}
				},function(err){
					delete $scope.getpromise;
				});
			}
		}

		function init(){
			if ($location.path()!='/'){
				$scope.get.activities();
			}
			else {
				$scope.get.years();
			}	
		}

		init();
		
		$scope.download_documentation =  function(src) {
			// window.open('../../'+src);
			// Uncomment for localhost -- window.open('./'+src)
			window.open('../'+src) // For production
		}

		$scope.trustSrc = function(src) {
			var s = './'+src
			return $sce.trustAsResourceUrl(s);
		}	

		$scope.refreshActivities=function(){
			$scope.get.activities(true);
		}
	}
})();
