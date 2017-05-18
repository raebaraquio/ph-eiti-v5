secretariat.factory('ProfileFactory', function($http){

      var ProfileFactory = {
            profile: {
                  save : function(data){
                        var promise = $http({
                              url: '../../be/functions/userprofile-update.php',
                              method: 'POST',
                              data:data
                        })
                        return promise
                  }     
            } 
      };
      return ProfileFactory;

})