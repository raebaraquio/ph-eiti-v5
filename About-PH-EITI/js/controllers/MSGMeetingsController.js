aboutApp.controller('MSGMeetingsController',['$scope','MSGFactory',
	function($scope,MSGFactory){
	
	$scope.meetings = []
    $scope.meeting_selected = {}
    $scope.filterTitle = ''

    var get = {
        one : function(title) {
            var mtg = MSGFactory.get.meetings();
            var s = {}
            for (var key in mtg) {
                if (mtg[key].title == title) {
                    s = mtg[key];
                    break;
                }
            }
            $scope.meeting_selected = s;
        },
        meetings : function() {
            $scope.meetings = MSGFactory.get.meetings();
            $scope.meeting_selected = $scope.meetings[0]
            $scope.filterTitle = $scope.meetings[0].title
        }
    }

    $scope.load_meeting = function(title) {
        get.one(title);
    }

    $scope.download_minutes = function (argument) {
        window.open('../'+argument)
    }

    get.meetings();

}]);