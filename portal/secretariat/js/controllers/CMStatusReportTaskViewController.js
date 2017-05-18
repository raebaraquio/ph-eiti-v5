secretariat.controller('CMStatusReportTaskViewController',function($scope,
                                            $location,
                                            $cookies,
                                            $cookieStore,
                                            $window,
                                            StatusReportFactory){

  if ( !$cookieStore.get("user") ) {
    $window.location.href = '../../login/';
  }

  $("#unav-Content-Management").addClass('unav-selected');
  $(".unav").not("#unav-Content-Management").removeClass('unav-selected');

  $scope.user = $cookieStore.get("user");
  $scope.tasks = []
  $scope.edit = false

  var location = $location.$$path.split('/');
  $scope.pk = parseInt(location[3],10);
  
  function get_tasks() {
    var promise = StatusReportFactory.gettask($scope.pk);
    promise.then(function(data){
      $scope.currtask = data.data[0]
    })
  }

  get_tasks();

})

