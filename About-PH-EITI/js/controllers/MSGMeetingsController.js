aboutApp.controller('MSGMeetingsController',['$scope','MSGFactory',
	function($scope,MSGFactory){
	try {
        ga('send', 'event', 'Pages', 'loaded', 'About PH-EITI : MSG Meetings'); 
    }
    catch(gaError){
        console.log('GA - '+gaError)
    }
	$scope.meetings = []
    $scope.meeting_selected = {}
    $scope.filterTitle = ''
    $scope.selectedIdx = null;
    var get = {
        one : function(title) {
            var mtg = MSGFactory.get.meetings();
            var s = {}
            for (var idx=0;idx<mtg.length;idx++) {
                if (mtg[idx].title == title) {
                    s = mtg[idx];
                    $scope.selectedIdx = idx;
                    break;
                }
            }
            $scope.meeting_selected = s;
        },
        meetings : function() {
            $scope.meetings = MSGFactory.get.meetings();
            $scope.meeting_selected = $scope.meetings[0]
            $scope.filterTitle = $scope.meetings[0].title
            $scope.selectedIdx = 0
        }
    }

    $scope.load_meeting = function(title) {
        get.one(title);
    }

    $scope.download_minutes = function (argument) {
        window.open('../'+argument)
    }

    $scope.getPrevMtg=function(){        
        var title = $scope.meetings[$scope.selectedIdx+1].title
        get.one(title)
        $scope.filterTitle = title
    }

    $scope.getNexMtg=function(){
        var title = $scope.meetings[$scope.selectedIdx-1].title
        get.one(title)
        $scope.filterTitle = title
    }

    get.meetings();

}]);