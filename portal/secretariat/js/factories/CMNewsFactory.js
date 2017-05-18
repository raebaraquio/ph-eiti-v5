secretariat.factory('CMNewsFactory', function($http){

      var CMNewsFactory = {
            getsections : function() {
                  return [
                        "News and Events",
                        "PH-EITI in the News",
                        "Affiliate News",
                        "MSG Member of the Month",
                        "EITI in other Countries"
                  ];
            },
            newentry : function(data){
                  var promise = $http({
                        url: '../../be/functions/news-new.php',
                        method: 'POST',
                        data:data
                  })
                  return promise;
            }
      };
      return CMNewsFactory;

})
