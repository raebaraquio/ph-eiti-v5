aboutApp.controller('SecretariatController',['$scope','AboutFactory',
	function($scope,AboutFactory){
	try {
        ga('send', 'event', 'Pages', 'loaded', 'About PH-EITI : Secretariat'); 
    }
    catch(gaError){
        console.log('GA - '+gaError)
    }
	$scope.secretariat = AboutFactory.secretariat();
	
}]);