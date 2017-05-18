login.controller('LoginController',['$scope','LoginFactory','$cookies',
	function($scope,LoginFactory,$cookies){
	
	localStorage.clear();

	////////////////////////
	// Remove All Cookies //
	////////////////////////
	$scope.removeCookies = function() {
	  var cookies = $cookies.getAll();
	  for (var k in cookies) {
	    $cookies.remove(k);
	  }
	}
	$scope.removeCookies();

	$scope.userfeedback = { message : '',type: '' }
	// Check if logged in

    $scope.loading = false;
	$scope.login = {}

	$scope.log_on = function() {
		$scope.userfeedback.message = ''
		$scope.userfeedback.type = ''

		if ($scope.loginForm.$invalid) {
			return
		}

		/////////////////////////////
		// Remove Existing Cookies //
		/////////////////////////////
		if ($cookies.get('id')) {
		  $cookies.remove('id')
		}
		if ($cookies.get('name')) {
		  $cookies.remove('name')
		}
		if ($cookies.get('position')) {
		  $cookies.remove('position')
		}
		if ($cookies.get('email')) {
		  $cookies.remove('email')
		}
		if ($cookies.get('mobile')) {
		  $cookies.remove('mobile')
		}
		if ($cookies.get('piclocation')) {
		  $cookies.remove('piclocation')
		}

		$scope.loading = true;		
		$scope.loginPromise = LoginFactory.login($scope.login);
		$scope.loginPromise.then(function(data){
			if (typeof(data.data[0]) != 'string') {				
				var user = data.data[0];
				
				if (localStorage) {
					localStorage.setItem('id',user.id)
					localStorage.setItem('name',user.name)
					localStorage.setItem('position',user.position)
					localStorage.setItem('email',user.email)
					localStorage.setItem('mobile',user.mobile)
					localStorage.setItem('piclocation',user.piclocation)
				}
			    
				/////////////////////////
				// Setting new cookies //
				/////////////////////////
				$cookies.put('id',user.id)
				$cookies.put('name',user.name)
				$cookies.put('position',user.position)
				$cookies.put('email',user.email)
				$cookies.put('mobile',user.mobile)
				$cookies.put('piclocation',user.piclocation)

			    $scope.loading = false;
			    // alert('redirect to cms')
				window.location.href = '../cms/';
			}
			else {
				$scope.userfeedback.message = data.data;
				$scope.userfeedback.type = 'error';
				$scope.loading = false;
			}
			delete $scope.loginPromise;
		})
	}

	$scope.logIn = function(e) {
		if (e.keyCode==13) {
			$scope.log_on()
		}
		return
	}

	$scope.reset = function(){
		$scope.userfeedback.message = '';
		$scope.userfeedback.type = '';
		$scope.loading = false;
	}
}]);