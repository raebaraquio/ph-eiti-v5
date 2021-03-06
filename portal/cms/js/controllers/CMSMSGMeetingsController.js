var msgmtgscope;
(function(){
	'use strict';

	angular
		.module('cms')
		.filter('formatDate',formatDate)
		.factory('msgMtgDataFactory',msgMtgDataFactory)
		.controller('CMSMSGMeetingsController',CMSMSGMeetingsController)
        .controller('addMSGmeetingController',addMSGmeetingController)
        .controller('addMinutesCtrl',addMinutesCtrl)
        .controller('addAnnexCtrl',addAnnexCtrl);

	function formatDate(){
        return function(input) {
           return moment(input).format('LL')
        };
    } 

	msgMtgDataFactory.$inject = ['$http'];
	function msgMtgDataFactory($http){

	    var msgMtgDataFactory = {
            getMSGmeetings : getMSGmeetings,
            deleteMeeting : deleteMeeting,
            deleteMinutesAnnex : deleteMinutesAnnex
	    }

	    return msgMtgDataFactory;

	    /////// 

	    function getMSGmeetings(){
            return $http({
                url:'../../rest/functions/get-msgmeetings.php',
                method: 'GET'
            });
        }

        function deleteMeeting(id){
            return $http({
                url:'../../rest/functions/msg-meetings/delete-msg-meeting.php?id='+id,
                method: 'GET'
            });
        }

        function deleteMinutesAnnex(id,minutesUrl,annexId,annexUrl){
            var pathParam = "";
            if (minutesUrl!="") {
                pathParam += "&mUrl="+minutesUrl;
            }
            if (annexId!=null) {
                pathParam += "&annexId="+annexId;
                if (annexUrl!=null) {
                    pathParam += "&aUrl="+annexUrl;
                }
            }
            return $http({
                url:'../../rest/functions/msg-meetings/delete-minutes-annex.php?id='+id+pathParam,
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
                        localStorage.setItem('msgMeetingSelected',JSON.stringify($scope.meeting_selected));
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
            localStorage.setItem('msgMeetingSelected',JSON.stringify($scope.meeting_selected));
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
            localStorage.setItem('msgMeetingSelected',JSON.stringify($scope.meeting_selected));
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

        $scope.addMinutes=function(evt){
            localStorage.setItem('msgMeetingSelected',JSON.stringify($scope.meeting_selected));
            var template = '';
            var mdDialogObj = {
                parent: angular.element(document.getElementById('cms-content-placeholder')),
                targetEvent: evt,
                clickOutsideToClose:false,
                fullscreen: true                
            };
            mdDialogObj.controller = addMinutesCtrl;
            mdDialogObj.templateUrl = 'partials/MSG Meetings/add-minutes.html';
            $mdDialog.show(mdDialogObj)
            .then(function(answer) {
                getMtgs();
            },function() {
                getMtgs();
            });
        }

        $scope.addAnnex=function(evt){
            var template = '';
            var mdDialogObj = {
                parent: angular.element(document.getElementById('cms-content-placeholder')),
                targetEvent: evt,
                clickOutsideToClose:false,
                fullscreen: true                
            };
            mdDialogObj.controller = addAnnexCtrl;
            mdDialogObj.templateUrl = 'partials/MSG Meetings/add-annex.html';
            $mdDialog.show(mdDialogObj)
            .then(function(answer) {
                getMtgs();
            },function() {
                getMtgs();
            });
        }

        $scope.confirmDelete=function(evt,resourceType,data) {
			var resourceName = data.mtg_title;
			var mid = data.mtgid;
			var confirm = $mdDialog.confirm()
				.title('Delete '+resourceType+'?')
				.textContent('This action will permanently delete the selected '+resourceType+' ('+resourceName+'). What would you like to do?')
				.targetEvent(evt)
				.ok('Yes, Delete '+resourceType)
				.cancel("No, Don't Delete "+resourceType);

			$mdDialog.show(confirm).then(function() {
				$scope.deletePromise = msgMtgDataFactory.deleteMeeting(mid);
				$scope.deletePromise.then(function(response){
					if (response.data.success) {
                        getMtgs();
					}
					delete $scope.deletePromise;
				},function(err){
					console.log(err)
                    getMtgs();
					delete $scope.deletePromise;
				});		
			}, function() {
				// do nothing
			});
		}

        $scope.confirmDeleteMinutesAnnex=function(evt,docType,mtgData,annexData) {
            var msgText = "";
            var mtgId = mtgData.mtgid;
            var annexId = null;
            var minutesUrl = "", annexUrl = "";
            if (docType=='Minutes') {
                msgText = " meeting minutes";
                minutesUrl = mtgData.minutes_url;
            }
            else if (docType=='Annex') {
                msgText = " selected "+docType+" ("+annexData.title+")";
                annexId = annexData.annex_id;
                annexUrl = annexData.file;
            }
            var confirm = $mdDialog.confirm()
                .title('Delete '+docType+'?')
                .textContent('This action will permanently delete the selected '+msgText+'. What would you like to do?')
                .targetEvent(evt)
                .ok('Yes, Delete '+docType)
                .cancel("No, Don't Delete "+docType);

            $mdDialog.show(confirm).then(function() {
                $scope.deletePromise = msgMtgDataFactory.deleteMinutesAnnex(mtgId,minutesUrl,annexId,annexUrl);
                $scope.deletePromise.then(function(response){
                    if (response.data.success) {
                        getMtgs();
                    }
                    delete $scope.deletePromise;
                },function(err){
                    getMtgs();
                    delete $scope.deletePromise;
                });     
            }, function() {
                // do nothing
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

    addMinutesCtrl.$inject = ['$scope','$mdDialog'];
    function addMinutesCtrl($scope,$mdDialog){
    
        $scope.errorMessage = "";       
        // $scope.mtgAnnexes = [];
        $scope.uploadReturnData = {};
        $scope.useDate = '';
        $scope.lastMeeting = localStorage.getItem('lastMeeting');
        $scope.selectedMeeting = JSON.parse(localStorage.getItem('msgMeetingSelected'));
        $scope.with_annex = 0;
        $scope.numAnnex = 0;

        var maxNum = 5; 

        console.log($scope.selectedMeeting)

        $scope.newmsg = {
            file: null,
            title: '',
            date: '',
            time: '',
            venue: ''
        }

        function init(){
            // for (var idx=0;idx<maxNum;idx++) {
            //     $scope.mtgAnnexes.push({
            //         file: null,
            //         title: ''
            //     });
            // }
        }

        init();

        $scope.onFileChanged = function (evt) {
            $scope.$apply(function() {
                if (evt.target.id==='newmsg-minutesfile') {
                    $scope.newmsg.file = document.getElementById(evt.target.id).files[0];    
                }
                else {
                    // $scope.with_annex = 1;
                    // var idlen = evt.target.id.split('-');
                    // var idx = idlen[idlen.length-1];
                    // if (document.getElementById(evt.target.id).files[0]===undefined) {
                    //     $scope.mtgAnnexes[idx].file = null;    
                    // }
                    // else {
                    //     $scope.mtgAnnexes[idx].file = document.getElementById(evt.target.id).files[0];
                    // }
                }
            });
            checkFiles();
        };

        function checkFiles(){
            // var withfile = 0;
            // $scope.numAnnex = 0;
            // if ($scope.mtgAnnexes) {
            //     for (var idx=0;idx<$scope.mtgAnnexes.length;idx++) {
            //         if ($scope.mtgAnnexes[idx].file!==null && $scope.mtgAnnexes[idx].file!==undefined) {
            //             withfile = 1;
            //             $scope.numAnnex++;
            //         }
            //     }
            // }
            // $scope.with_annex = withfile;
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

    addAnnexCtrl.$inject = ['$scope','$mdDialog'];
    function addAnnexCtrl($scope,$mdDialog){
    
        $scope.errorMessage = "";       
        $scope.mtgAnnexes = [];
        $scope.uploadReturnData = {};
        $scope.useDate = '';
        $scope.lastMeeting = localStorage.getItem('lastMeeting');        
        $scope.selectedMeeting = JSON.parse(localStorage.getItem('msgMeetingSelected'));
        $scope.with_annex = 0;
        $scope.numAnnex = 0;

        var maxNum = 5;

        console.log($scope.selectedMeeting)

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

function newMsgAnnexReturn(){
    var iframe = document.getElementById('newmsgannex-iframe')
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

function newMsgMinutesReturn(){
    var iframe = document.getElementById('newminutes-iframe')
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