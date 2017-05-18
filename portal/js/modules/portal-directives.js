angular.module('navigationDirective',[])
.factory('NavigationFactory',function(){
	var NavigationFactory = {
		_get_ : {
			MainNavigation : function() {
				return [
					    {
					    	route:'Content Management',
					    	href:'../cms',
					    	selected:true,
					    	id:'Content-Management'
					    }
					];
			}
		}
	};
	return NavigationFactory;	
})
.controller('NavigationController',['$scope','$location','NavigationFactory','$rootScope','$route',
	function($scope,$location,NavigationFactory,$rootScope,$route){
	$scope.active = {
		mnav : '',
		subnav : ''
	}
	
	$scope.getnavigation = function() {
		$scope.usernavigation = [];
		$scope.usernavigation = NavigationFactory._get_.MainNavigation();	
	}
	
	if ($location.$$absUrl.match(/portal/gi)){
		$scope.active.mnav = ''
		$scope.active.subnav = ''
		var mnav = ''
		try {
			mnav = $location.$$absUrl.split('portal')[1].split('/')[1]
		}
		catch(err) {

		}
	}

	$scope.setActive = function(mnav) {
		switch(mnav) {
			case 'cms' : 
				$scope.active.mnav = 'Content-Management'
				break;
		}
	}

	$rootScope.$on('$routeChangeSuccess', function(next, current) { 

		try {
			var mnav = ''
			$scope.active.mnav = ''
			$scope.active.subnav = ''

			if ($location.$$absUrl.match(/portal/gi)){
				try {
					mnav = $location.$$absUrl.split('portal')[1].split('/')[1]
				}
				catch(err) {

				}
			}		

			$scope.setActive(mnav)
	
			// if ($route.current.title) {
			// 	document.title = $route.current.title;	
			// }
		}
		catch(err)	{
			
		}
	});
	
	$scope.getnavigation()
}])



angular.module('userprofile',['sessionModule'])
.controller('ProfileController',['$scope','sessionService',
	function($scope,sessionService){
	
	if (sessionService.inSession()===false) {
		window.location.href = '../../portal/';
	}

	// Model Declarations
	$scope.user = {
		id:sessionService.userProperty('id'),
		name:sessionService.userProperty('name'),
		position:sessionService.userProperty('position'),
		email:sessionService.userProperty('email'),
		mobile:sessionService.userProperty('mobile'),
		piclocation:sessionService.userProperty('piclocation')
	}

	if ($scope.user.mobile === undefined) {
		$scope.user.mobile = ''	
	}

}]);
