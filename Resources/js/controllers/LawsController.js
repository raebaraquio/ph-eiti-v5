resourcesApp.controller('LawsController',['$scope','LawsFactory',
	function($scope,LawsFactory){

	$scope.lawsContent = LawsFactory.get();
    $scope.filterMuniProv = 'Provinces';

	$scope.goto_link = function(link) {
    	if (link!='') {
    		if (link.match(/http/)) {
				window.open(link)	
    		}
    		else {
    			window.open('../'+link); // ../../
    		}
    	}
    	else {
    		alert('No link available')
    	}
    }

    $scope.goto_file = function(link) {
    	// ../../
    	window.open('../document/Laws/Tax-Codes/'+link+'.pdf')
    }

    $scope.refresh_taxcodes = function() {
    	$scope.taxcodes = $scope.alltaxcodes[$scope.selected_tax_code]
    }

}]);