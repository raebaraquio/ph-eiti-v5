secretariat.controller('ProfileNavigationController',function($scope,
											$location,
                                            $cookies,
                                            $cookieStore,
                                            $window){

	if ( !$cookieStore.get("user") ) {  
    	$window.location.href = '../../login/';
    }

    $scope.user = $cookieStore.get('user');

    $scope.usernavigation = [	
	    {
	    	route:'Profile',
	    	href:'#/',
	    	selected:true,
	    	id:"Profile"
	    },
	    {
	    	route:'Content Management',
	    	href:'#/Content-Management',
	    	selected:false,
	    	id:'Content-Management'
	    },
	    {
	    	route:'Account Settings',
	    	href:'#/Account-Settings',
	    	selected:false,
	    	id:'Account-Settings'
	    },
	    {
	    	route:'Log out',
	    	href:'../../login',
	    	selected:false,
	    	id:'Log-out'
	    }
    ];


    
	// $scope.login = {}
	// $scope.log_on = function() {
	// 	var promise = LoginFactory.login($scope.login);
	// 	promise.then(function(data){
	// 		if (data.data != 'null' && data.data != null) {
	// 			var user = data.data[0];

	// 			if ( $cookieStore.get("user") ) {
	// 		        $cookieStore.remove("user");
	// 		    }

	// 		    $cookieStore.put("user",{id:user.id,
	// 		    						 name:user.name,
	// 		    						 position:user.position,
	// 		    						 email:user.email })

	// 		    // console.log($cookieStore.get('user'));
	// 			$location.path('/Home');
	// 		}
	// 	})
	// }

})

