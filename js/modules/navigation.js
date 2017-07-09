(function(){
	'use strict';

	angular
		.module('navMod',[
			'ngRoute',
			'utilsModule'
		]);

	angular
		.module('navMod')
		.factory('NavigationFactory',NavigationFactory)
		.controller('NavigationController',NavigationController)
		.directive('navigation',navigation)
		.directive('homenavigation',homenavigation);

	NavigationFactory.$inject = ['$http'];
	function NavigationFactory($http){
		var __baseURL__ = 'https://api.mlab.com/api/1/databases/pheiti/collections/navigation/';
	    var __APIKEY__ = 'AkQtTxgkxLEYOQz9oFH85K3godWJNhtr';

	    var NavigationFactory  = {
	    	get : get,
	    	offline : null
	    }

	    return NavigationFactory; 

	    ////// 

		function get(){
			return $http({
	            url:__baseURL__+'595d0548f36d283e6e72d2db?apiKey='+__APIKEY__,
	            method:'GET'
	        });
		}
	}

	NavigationController.$inject = ['$scope','$location','NavigationFactory','$rootScope','$route','utilsService','$mdMenu'];
	function NavigationController($scope,$location,NavigationFactory,$rootScope,$route,utilsService,$mdMenu){
		$scope.active = {
			mnav : '',
			subnav : ''
		}
		function setupNavigation(){
			var mainnav = NavigationFactory.offline;
			for (var idx=0;idx<mainnav.length;idx++){
				if (mainnav[idx].subnav.length > 0) {
					mainnav[idx].subnav_open = false;
					for (var sidx=0;sidx<mainnav[idx].subnav.length;sidx++) {
						mainnav[idx].subnav[sidx].subnav_open = false;
					}
				}
			}
			$scope.main_nav = mainnav;
			if ($location.$$absUrl.match(/#/gi)){
				var locs = $location.$$absUrl.split('#');
				var host = locs[0].split('/');
			}
			else {
				var host = $location.$$absUrl.split('/');
			}
			if (utilsService.inObj($scope.main_nav,'href',host[host.length-2])) {
				$scope.active.mnav = utilsService.getObjOtherPropVal($scope.main_nav,'href',host[host.length-2],'id');
			}
			$scope.active.subnav = ''
		}

		$scope.getnavigation = function() {
			$scope.main_nav = [];
			if (!NavigationFactory.offline) {
				var p = NavigationFactory.get();
				p.then(function(response){
					NavigationFactory.offline = response.data.content;
					setupNavigation();
				},function(error){});
			}
			else {
				setupNavigation();
			}			
		}

		$rootScope.$on('$routeChangeSuccess', function(next, current) { 
			try {
				$scope.active.subnav = $location.path().split('/')[1]
				if ($route.current.title) {
					document.title = $route.current.title;	
				}
			}
			catch(err){}
		});

		$scope.getnavigation();

		$scope.runMe=function(){
			$mdMenu.hide();
		}

		$scope.$on('$mdMenuOpen', function(event, menu) { 
			
		});

		$scope.$on('$mdMenuClose', function(event, menu) { 
			for (var idx=0;idx<$scope.main_nav.length;idx++){
				if ($scope.main_nav[idx].subnav_open===true){
					$scope.main_nav[idx].subnav_open = false;
				}			
			}
		});
	}

	function navigation(){
		var templateUrl = 'app/Navigation/main-navigation-template.html';
		var navigation = {
			restrict : 'A',
			replace:true,
			scope: {
				navs:'=',
				selected:'='
			},
			templateUrl : templateUrl
		}
		return navigation;
	}

	function homenavigation(){
		var templateurl = 'template/nav/';
		var homenavigation = {
			restrict : 'A',
			replace:true,
			scope: {
				navs:'=',
				selected:'='
			},
			templateUrl : templateurl
		}
		return homenavigation;
	}
})();
