secretariat.controller('CMNewsletterController',function($scope,
                                            $location,
                                            $cookies,
                                            $cookieStore,
                                            $window,
                                            NewsletterFactory){

  if ( !$cookieStore.get("user") ) {
    $window.location.href = '../../login/';
  }

  $("#unav-Content-Management").addClass('unav-selected');
  $(".unav").not("#unav-Content-Management").removeClass('unav-selected');

  $scope.user = $cookieStore.get("user");
  
  $scope.subscribers = []

  $scope.noneconfirmed = 1
  $scope.noneunconfirmed = 1
  function getsubscribers() {
    var promise = NewsletterFactory.getsubscribers();
    promise.then(function(data){
      $scope.subscribers = data.data
      var confirmed_count = 0, unconfirmed_count = 0;
      for (var k in $scope.subscribers) {
        
        if ($scope.subscribers[k].confirmed == 0) {
          unconfirmed_count++;
        }
        if ($scope.subscribers[k].confirmed == 1) {
          confirmed_count++;
        }
      }

      if (unconfirmed_count == $scope.subscribers.length) {
        $scope.noneconfirmed = 1;
        $scope.noneunconfirmed = 0;
      }

      if (confirmed_count == $scope.subscribers.length) {
        $scope.noneconfirmed = 0;
        $scope.noneunconfirmed = 1;
      }
    })
  }

  getsubscribers();

  $scope.subscription_type = 'unconfirmed'

  $scope.exportsubscribers = function() {
    window.location = '../../be/functions/newsletter-export-subscribers.php?confirmation='+$scope.subscription_type;
  }
})

