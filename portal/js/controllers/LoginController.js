access.controller('LoginController',['$scope','$location','$cookies','$cookieStore','$window','LoginFactory',
	function($scope,$location,$cookies,$cookieStore,$window,LoginFactory){
	
	$scope.userfeedback = { message : '',type: '' }

	// Check if logged in
	if ( $cookieStore.get("user") ) {
        $cookieStore.remove("user");
    }

    $scope.loading = false;
	$scope.login = {}

	$scope.log_on = function() {
		$scope.userfeedback.message = ''
		$scope.userfeedback.type = ''

		if ($scope.loginForm.$invalid) {
			return
		}

		$scope.loading = true;		
		var promise = LoginFactory.login($scope.login);
		promise.then(function(data){
			if (typeof(data.data[0]) != 'string') {				
				var user = data.data[0];
				if ( $cookieStore.get("user") ) {
			        $cookieStore.remove("user");
			    }
			    $cookieStore.put("user",{id:user.id,
			    						 name:user.name,
			    						 position:user.position,
			    						 email:user.email,
			    						 mobile:user.mobile,
			    						 piclocation:user.piclocation })
			    $scope.loading = false;
				$window.location.href = 'secretariat/';
			}
			else {
				$scope.userfeedback.message = data.data;
				$scope.userfeedback.type = 'error';
				$scope.loading = false;
			}
		})
	}

	$scope.logIn = function(e) {
		if (e.keyCode==13) {
			$scope.log_on()
		}
		return
	}
}]);