secretariat.factory('CMSFactory', function($http){
      var CMSFactory = {
            getsections : function(){
                  return [
                        {
                              id:"Announcements",
                              title:"Announcements",
                              goTo:"Announcements"     
                        },
                        {
                              id:"Activity-Report",
                              title:"Activity Report",
                              goTo:"Activity-Report"     
                        },
                        {
                              id:"Blogs",
                              title:"Blogs",
                              goTo:"Blogs"     
                        },
                        {
                              id:"EITI-Trivia",
                              title:"EITI Trivia",
                              goTo:"EITI-Trivia"     
                        },
                        {
                              id:"News",
                              title:"News",
                              goTo:"News"     
                        },
                        {
                              id:"Newsletter",
                              title:"Newsletter",
                              goTo:"Newsletter"     
                        }
                  ];
            } 
      };
      return CMSFactory;
})