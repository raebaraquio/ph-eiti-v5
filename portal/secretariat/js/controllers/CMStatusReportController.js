secretariat.controller('CMStatusReportController',function($scope,
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
  
  function get_tasks() {
    var promise = StatusReportFactory.gettasks();
    promise.then(function(data){
      $scope.tasks = data.data
    })
  }

  get_tasks();

})

