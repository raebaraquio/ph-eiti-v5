secretariat.factory('NewsletterFactory', function($http){

      var NewsletterFactory = {
            getsubscribers : function() {
                  var promise = $http({
                        url: '../../be/functions/newsletter-getsubscribers.php',
                        method: 'GET'
                  })
                  return promise;
            }
            // gettask : function(pk) {
            //       var promise = $http({
            //             url: '../../be/functions/Newsletter-gettasks.php?pk='+pk,
            //             method: 'GET'
            //       })
            //       return promise;
            // }
      };
      return NewsletterFactory;

})
