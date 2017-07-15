aboutApp.controller('MSGMeetingsController',['$scope','dataFactory','$routeParams',
	function($scope,dataFactory,$routeParams){
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
            var s = {}
            for (var idx=0;idx<$scope.meetings.length;idx++) {
                if ($scope.meetings[idx].mtg_title == title) {
                    s = $scope.meetings[idx];
                    $scope.selectedIdx = idx;
                    break;
                }
            }
            $scope.meeting_selected = s;
        },
        meetings : function() {
            var mtgId = null;
            try {
                if ($routeParams) {
                    mtgId = $routeParams.mtgId;
                }
            }
            catch(e){}

            console.log($routeParams)
            console.log(window.location)
            console.log(mtgId)
            // return false

            $scope.getPromise = dataFactory.getMSGmeetings();
            $scope.getPromise.then(function(response){
                var meetings = response.data.meetings;
                var newMeetings = []
                if (meetings.length > 0) {
                    for (var i=meetings.length;i>=0;i--) {
                        var mtg = meetings[i];
                        var annexes = [];
                        if (mtg) {
                            if (mtg.with_annex=='1') {
                                var temp_annexes = mtg.meeting_annexes;
                                if (temp_annexes.match(/---/gi)) {
                                    var a = temp_annexes.split('---');
                                    for (var idx=0;idx<a.length;idx++) {
                                        if (a[idx].match(/~~~/gi)) { // With File
                                            var b = a[idx].split('~~~');
                                            annexes.push({
                                                annex_id : b[0],
                                                title : b[1],
                                                file : b[2]
                                            });
                                        }
                                    }
                                }
                                else { // One File
                                    if (temp_annexes.match(/~~~/gi)) { // With File
                                        var b = temp_annexes.split('~~~');
                                        annexes.push({
                                            annex_id : b[0],
                                            title : b[1],
                                            file : b[2]
                                        });
                                    }
                                }
                            }
                            meetings[i].annexes = annexes;
                            newMeetings.push(meetings[i]);

                            if (mtgId!==null) {
                                console.log(mtg)
                                if (mtgId===mtg.mtgid) {
                                    $scope.meeting_selected = meetings[i];
                                    $scope.filterTitle = meetings[i].mtg_title;
                                    $scope.selectedIdx = i;    
                                }
                            }    
                        }
                        
                    }
                    
                    $scope.meetings = newMeetings;

                    if (mtgId===undefined) {
                        $scope.meeting_selected = newMeetings[0];
                        $scope.filterTitle = newMeetings[0].mtg_title;
                        $scope.selectedIdx = 0;    
                    }
                    
                }
                delete $scope.getPromise;
            },function(error){
                console.log(error)
                delete $scope.getPromise;
            });
        }
    }

    $scope.load_meeting = function(title) {
        get.one(title);
    }

    $scope.download_minutes = function (argument) {
        window.open('../'+argument)
    }

    $scope.getPrevMtg=function(){        
        var title = $scope.meetings[$scope.selectedIdx+1].mtg_title
        get.one(title)
        $scope.filterTitle = title
    }

    $scope.getNexMtg=function(){
        var title = $scope.meetings[$scope.selectedIdx-1].mtg_title
        get.one(title)
        $scope.filterTitle = title
    }

    get.meetings();



}]);