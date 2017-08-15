(function(){
	'use strict';

	angular
		.module('cms')
		.filter('formatDate',formatDate)
		.factory('msgMtgDataFactory',msgMtgDataFactory)
		.controller('CMSMSGMeetingsController',CMSMSGMeetingsController);

	function formatDate(){
        return function(input) {
           return moment(input).format('LL')
        };
    } 

	msgMtgDataFactory.$inject = ['$http'];
	function msgMtgDataFactory($http){

	    var msgMtgDataFactory = {
	        getMSGmeetings : getMSGmeetings
	    }

	    return msgMtgDataFactory;

	    /////// 

	    function getMSGmeetings(){
            return $http({
                url:'../../rest/functions/get-msgmeetings.php',
                method: 'GET'
            });
        }
	}


	CMSMSGMeetingsController.$inject = ['$scope','sessionService','msgMtgDataFactory','$routeParams'];
	function CMSMSGMeetingsController($scope,sessionService,msgMtgDataFactory,$routeParams) {
		if (sessionService.inSession()===false) {
			window.location.href = '../../portal/';
		}
		$scope.user = {
			id:sessionService.userProperty('id'),
			name:sessionService.userProperty('name'),
			position:sessionService.userProperty('position'),
			email:sessionService.userProperty('email'),
			mobile:sessionService.userProperty('mobile'),
			piclocation:sessionService.userProperty('piclocation')
		}
		
		if ($scope.user.mobile === undefined) {
			$scope.user.mobile = ''	
		}

		var mtgId = null;
        try {
            if ($routeParams) {
                mtgId = $routeParams.mtgId;
            }
        }
        catch(e){}

		$scope.getPromise = msgMtgDataFactory.getMSGmeetings();
        $scope.getPromise.then(function(response){
        	console.log(response.data)
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

		function getOne(title) {
            var s = {}
            for (var idx=0;idx<$scope.meetings.length;idx++) {
                if ($scope.meetings[idx].mtg_title == title) {
                    s = $scope.meetings[idx];
                    $scope.selectedIdx = idx;
                    break;
                }
            }
            $scope.meeting_selected = s;
        }

		$scope.open_file=function(src,file){
			try {
				ga('send', 'event', 'Files', 'opened', "Reporting Templates ("+$scope.filterYear+") : "+file.title);	
			}
			catch(gaError){
				console.log('GA - '+gaError)
			}
			window.open('../'+src)
		}

		$scope.getPrevMtg=function(){        
        	var title = $scope.meetings[$scope.selectedIdx+1].mtg_title
	        getOne(title)
	        $scope.filterTitle = title
	    }

	    $scope.getNexMtg=function(){
	        var title = $scope.meetings[$scope.selectedIdx-1].mtg_title
	        getOne(title)
	        $scope.filterTitle = title
	    }

	    $scope.load_meeting = function(title) {
	        getOne(title);
	    }

	    $scope.download_minutes = function (argument) {
	        window.open('../../'+argument)
	    }

	}
})();
