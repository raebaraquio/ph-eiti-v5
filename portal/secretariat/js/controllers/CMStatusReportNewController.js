secretariat.controller('CMStatusReportNewController',function($scope,
                                            $location,
                                            $cookies,
                                            $cookieStore,
                                            $window,
                                            StatusReportFactory){

  if ( !$cookieStore.get("user") ) {
    $window.location.href = '../../login/';
  }

  $scope.user = $cookieStore.get("user");

  $("#unav-Content-Management").addClass('unav-selected');
  $(".unav").not("#unav-Content-Management").removeClass('unav-selected');
  
  $scope.userfeedback = {message:'',type:''}
  
  $scope.resetForm = function() {
    $scope.userfeedback.message = '';
    $scope.userfeedback.type = '';
    $scope.newtask.name = '';
    $scope.newtask.description = '';
    $scope.newtask.reportstatus = 'Not started';
    $scope.newtask.addedby = $scope.user.name;
  }

  $scope.newtask = { name:'', description:'', reportstatus:'Not started', addedby: $scope.user.name}

  $scope.saveNewTask = function(){
    if ($scope.newtask.name == '') {
      alert('Task name is required.');
      return;
    }

    if ($scope.newtask.reportstatus == '') {
      alert('Task status is required.');
      return;
    }

    var promise = StatusReportFactory.newtask($scope.newtask);
    promise.then(function(data){
      if (data.data != null) {
        $scope.userfeedback.message = data.data
        $scope.userfeedback.type = 'success'
      }
    })
  }
  
})

