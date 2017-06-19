resourcesApp.controller('LawsController',['$scope','resourcesDataFactory',
	function($scope,resourcesDataFactory){

    $scope.lawsContent = [];
    $scope.filterMuniProv = '';
    $scope.selectedLawCategory = '';

    function getData(){
        $scope.getpromise = resourcesDataFactory.getAll('Laws');
        $scope.getpromise.then(function(response){

            delete $scope.getpromise;
            var content = [];
            var currCategory = "";

            if (response.data.length) {
                var rdata = response.data;
                var files = [];
                for (var idx=0;idx<rdata.length;idx++) {
                    if (rdata[idx].category!==currCategory) {
                        currCategory = rdata[idx].category;
                        content.push({
                            category : currCategory,
                            files : []
                        })
                    }
                    content[content.length-1].files.push(rdata[idx])
                }
            }
            
            $scope.lawsContent = angular.copy(content);
            $scope.filterMuniProv = 'Provinces';
            $scope.selectedLawCategory = $scope.lawsContent[0].category;
            
        },function(err){
            delete $scope.getpromise;
        });
    }

    getData();

    try {
        ga('send', 'event', 'Pages', 'loaded', 'Resources : Laws & Legal Issuances'); 
    }
    catch(gaError){
        console.log('GA - '+gaError)
    }    

	$scope.goto_link = function(link,file) {
    	if (link!='') {
            try {
                ga('send', 'event', 'Files', 'opened', $scope.selectedLawCategory+' : '+file.title);   
            }
            catch(gaError){
                console.log('GA - '+gaError)
            }
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

    $scope.goto_file = function(link,file,filter) {
    	try {
            ga('send', 'event', 'Files', 'opened',$scope.selectedLawCategory+' ('+filter+') : '+file.title);
        }
        catch(gaError){
            console.log('GA - '+gaError)
        }
    	window.open('../document/Laws/Tax-Codes/'+link+'.pdf')
    }

    $scope.refresh_taxcodes = function() {
        $scope.$apply();
    	$scope.taxcodes = $scope.alltaxcodes[$scope.selected_tax_code]
    }
        
    $scope.shorten=function(text, maxLength) {
        var ret = text;
        if (!ret){
            return null
        }
        if (ret.length > maxLength) {
            ret = ret.substr(0,maxLength-3) + "...";
        }
        return ret;
    }

    $scope.trackEvent=function(law){
        $scope.selectedLawCategory = law.category;
        try {
            ga('send', 'event', 'Pages', 'loaded', 'Laws & Legal Issuances : '+law.category); 
        }
        catch(gaError){
            console.log('GA - '+gaError)
        }    
    }

}]);