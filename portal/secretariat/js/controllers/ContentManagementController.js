secretariat.controller('ContentManagementController',function($scope,
                                            $location,
                                            $cookies,
                                            $cookieStore,
                                            $window,
                                            ProfileFactory,
                                            CMSFactory){

	if ( !$cookieStore.get("user") ) {
		$window.location.href = '../../login/';
	}

	$("#unav-Content-Management").addClass('unav-selected');
	$(".unav").not("#unav-Content-Management").removeClass('unav-selected');

	$scope.cmssections = []
	function loadsections () {
		$scope.cmssections = []
		var sections = CMSFactory.getsections();
		$scope.cmssections = sections;
	}

	loadsections();

	$scope.goTo = function(link) {
		$location.path('/Content-Management/'+link);
	}
})
