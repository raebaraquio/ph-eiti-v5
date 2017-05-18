access.factory('LoginFactory', function($http){
      var LoginFactory = {
            login : function(data){
                  var promise = $http({
                        url: '../be/functions/user-login.php',
                        method: 'POST',
                        data:data
                  })
                  return promise
            }
      };
      return LoginFactory;
});