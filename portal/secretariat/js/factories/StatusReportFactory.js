secretariat.factory('StatusReportFactory', function($http){

      var StatusReportFactory = {
            newtask:  function(data){
                  var promise = $http({
                        url: '../../be/functions/statusreport-new.php',
                        method: 'POST',
                        data:data
                  })
                  return promise;
            },
            gettasks : function() {
                  var promise = $http({
                        url: '../../be/functions/statusreport-gettasks.php',
                        method: 'GET'
                  })
                  return promise;
            },
            gettask : function(pk) {
                  var promise = $http({
                        url: '../../be/functions/statusreport-gettasks.php?pk='+pk,
                        method: 'GET'
                  })
                  return promise;
            }
      };
      return StatusReportFactory;

})
