aboutApp.controller('MSGController',['$scope','MSGFactory','$location','$sce',
	function($scope,MSGFactory,$location,$sce){
	try {
        ga('send', 'event', 'Pages', 'loaded', 'About PH-EITI : MSG Members'); 
    }
    catch(gaError){
        console.log('GA - '+gaError)
    }
	var loc = $location.path().split('/');

	$scope.members = []
    $scope.roles = []
    $scope.alternates = []
	$scope.selected_group = 'Government'    
    $scope.selected_idx = 0
    $scope.dateLastUpdated = MSGFactory.get.dateLastUpdated();

    $scope.setSelectedidx=function(){
        switch($scope.selected_group) {
            case 'Government': return 0; break;
            case 'CSO': return 1; break;
            case 'Industry': return 2; break;
        }
    }

	if (loc.length === 3) {
		$scope.selected_group = loc[loc.length-1]
        $scope.selected_idx = $scope.setSelectedidx();
	}
	
	$scope.msg = []
	
    var get = {
        members : function(group) {
            var data = MSGFactory.get.members();
            $scope.members = data[group].members
            $scope.roles = data[group].roles
            $scope.alternates = data[group].alternates

            $scope.msg = MSGFactory.get.newMembers();
        },
        memOfmonth : function(){
            $scope.articles = []
            var obj = {
                id:'',
                section:'MSG Member of the Month',
                published:true,
                page:'index-msg-of-month'
            }

            $scope.momPromise = MSGFactory.get.ofMonth(obj);
            $scope.momPromise.then(function(data){
                if (data.data != null && data.data != 'null') {
                    $scope.articles = data.data
                    for (var i in $scope.articles) {
                        if ($scope.articles[i].brief != null && $scope.articles[i].brief != '') {
                            $scope.articles[i].brief = $sce.trustAsHtml('<div style="font-size:13px;">'+shorten($scope.articles[i].brief,145)+'</div>');
                        }
                    }
                }
            })
        }
    }

    $scope.load_Members = function(grp) {
        $scope.selected_group = grp;
        get.members(grp);
    }

    function shorten(text, maxLength) {
        var ret = text;
        if (ret.length > maxLength) {
            ret = ret.substr(0,maxLength-3) + "...";
        }
        return ret;
    }

    $scope.load_Members($scope.selected_group);
    // get.memOfmonth();

    $scope.$on('$routeChangeSuccess', function(){
		var loc = $location.path().split('/')
        var grp = ''
        if (loc.length === 3) {
            grp = loc[loc.length-1]
        }
        $scope.load_Members(grp) 
        $scope.selected_idx = $scope.setSelectedidx()
    })

}]);