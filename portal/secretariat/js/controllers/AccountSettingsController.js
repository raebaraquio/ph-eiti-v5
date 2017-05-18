secretariat.controller('AccountSettingsController',function($scope,
                                            $location,
                                            $cookies,
                                            $cookieStore,
                                            $window,
                                            ProfileFactory){

  if ( !$cookieStore.get("user") ) {
    $window.location.href = '../../login/';
  }


  $("#unav-Account-Settings").addClass('unav-selected');
  $(".unav").not("#unav-Account-Settings").removeClass('unav-selected');
  

})