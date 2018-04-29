var msgmtgscope;
(function(){
	'use strict';

	angular
		.module('cms')
		.filter('formatDate',formatDate)
		.factory('msgMtgDataFactory',msgMtgDataFactory)
		.controller('CMSMSGMeetingsController',CMSMSGMeetingsController)
        .controller('addMSGmeetingController',addMSGmeetingController);

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


	CMSMSGMeetingsController.$inject = ['$scope','sessionService','msgMtgDataFactory','$routeParams','$mdDialog'];
	function CMSMSGMeetingsController($scope,sessionService,msgMtgDataFactory,$routeParams,$mdDialog) {
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

        function getMtgs(){
            $scope.getPromise = msgMtgDataFactory.getMSGmeetings();
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
                                if (temp_annexes!=null) {
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
                        localStorage.setItem('lastMeeting',$scope.filterTitle);
                    }
                    
                }
                delete $scope.getPromise;
            },function(error){
                console.log(error)
                delete $scope.getPromise;
            });  
        }
		
        getMtgs();

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

        //////// 

        $scope.addMsgMeeting=function(evt){
            var template = '';
            var mdDialogObj = {
                parent: angular.element(document.getElementById('cms-content-placeholder')),
                targetEvent: evt,
                clickOutsideToClose:false,
                fullscreen: true                
            };
            mdDialogObj.controller = addMSGmeetingController;
            mdDialogObj.templateUrl = 'partials/MSG Meetings/add-msgmeeting.template.html';
            $mdDialog.show(mdDialogObj)
            .then(function(answer) {
                getMtgs();
            },function() {
                getMtgs();
            });
        }

        
	}

    addMSGmeetingController.$inject = ['$scope','$mdDialog'];
    function addMSGmeetingController($scope,$mdDialog){
    
        $scope.errorMessage = "";       
        $scope.mtgAnnexes = [];
        $scope.uploadReturnData = {};
        $scope.useDate = '';
        $scope.lastMeeting = localStorage.getItem('lastMeeting');
        $scope.with_annex = 0;
        $scope.numAnnex = 0;

        var maxNum = 5;

        $scope.newmsg = {
            file: null,
            title: '',
            date: '',
            time: '',
            venue: ''
        }

        function init(){
            for (var idx=0;idx<maxNum;idx++) {
                $scope.mtgAnnexes.push({
                    file: null,
                    title: ''
                });
            }
            console.log($scope.mtgAnnexes)
        }

        init();

        $scope.onFileChanged = function (evt) {
            $scope.$apply(function() {
                if (evt.target.id==='newmsg-minutesfile') {
                    $scope.newmsg.file = document.getElementById(evt.target.id).files[0];    
                }
                else {
                    $scope.with_annex = 1;
                    var idlen = evt.target.id.split('-');
                    var idx = idlen[idlen.length-1];
                    if (document.getElementById(evt.target.id).files[0]===undefined) {
                        $scope.mtgAnnexes[idx].file = null;    
                    }
                    else {
                        $scope.mtgAnnexes[idx].file = document.getElementById(evt.target.id).files[0];
                    }
                }
            });
            checkFiles();
        };

        function checkFiles(){
            var withfile = 0;
            $scope.numAnnex = 0;
            if ($scope.mtgAnnexes) {
                for (var idx=0;idx<$scope.mtgAnnexes.length;idx++) {
                    if ($scope.mtgAnnexes[idx].file!==null && $scope.mtgAnnexes[idx].file!==undefined) {
                        withfile = 1;
                        $scope.numAnnex++;
                    }
                }
            }
            $scope.with_annex = withfile;
        }

        $scope.resetForm = function(evt) {
            $scope.with_annex = 0;
        }

        $scope.$watch('uploadReturnData', function(v){
            if (v) {
                try {
                    if (v.success===true) {
                        // $scope.resetForm();
                        var resetBtn = document.getElementById('newmsg-btn-reset');
                        resetBtn.click();
                        $mdDialog.hide();
                    }
                }
                catch(e){}
            }
        });

        $scope.$watch('newmsg.date',function(v){
            if (v) {
                $scope.useDate = moment(v).format('YYYY-MM-DD');
            }
        });

        $scope.close=function(){
            $mdDialog.hide();   
        }

        msgmtgscope = $scope;
    }
    
})();


function newMsgReturn(){
    var iframe = document.getElementById('newmsgmtg-iframe')
    var returnData = iframe.contentDocument.body.innerHTML;
    if (msgmtgscope) {
        try {
            if (returnData!=="unsubmitted" && returnData!=="") {
                var responseData = JSON.parse(returnData);
                msgmtgscope.uploadReturnData = responseData;
                msgmtgscope.$apply();   
            }
        }
        catch(e){
            console.log(e)
        }       
    }
}