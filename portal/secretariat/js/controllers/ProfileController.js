secretariat.controller('ProfileController',function($scope,
											$location,
                                            $cookies,
                                            $cookieStore,
                                            $window,
                                            ProfileFactory){

	if ( !$cookieStore.get("user") ) {
    	$window.location.href = '../../login/';
    }

    $scope.edit = false;
    $scope.user = $cookieStore.get('user');
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

    $("#unav-Profile").addClass('unav-selected');
    $(".unav").not("#unav-Profile").removeClass('unav-selected');

})

