profile.controller('EditProfileController',['$scope','$cookieStore','ProfileFactory',
	function($scope,$cookieStore,ProfileFactory){

	if (!sessionStorage.getItem('id')) {
		window.location.href = '../../portal/';
	}

	$scope.user = {
		id:sessionStorage.getItem('id'),
		name:sessionStorage.getItem('name'),
		position:sessionStorage.getItem('position'),
		email:sessionStorage.getItem('email'),
		mobile:sessionStorage.getItem('mobile'),
		piclocation:sessionStorage.getItem('piclocation')
	}

	$scope.edit = false;

	if ($scope.user.mobile === undefined) {
		$scope.user.mobile = ''	
	}

	$scope.updatedprofile = $scope.user;

	$scope.userfeedback = {message:'',type:''}
	$scope.editProfile = function() {
		$scope.edit = true;
		$scope.userfeedback.message = '';
		$scope.userfeedback.type = '';
	}

	$scope.saveProfile = function() {
		$scope.edit = false;
		$scope.user = $scope.updatedprofile;
		var promise = ProfileFactory.profile.save($scope.user);
		promise.then(function(data){
			$scope.userfeedback.message = data.data;
			if (data.data.match(/saved/i)) {
				$scope.userfeedback.type = 'success';			
			}
			else {
				$scope.userfeedback.type = 'error';
			}
		})
	}
	
}])