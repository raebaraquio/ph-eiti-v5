var searchApp = angular.module('searchApp',['ngRoute','ngSanitize','ngCookies','navMod','ngMaterial','utilsModule','angular-timeline','md.data.table','secretariatContactMod']);

searchApp.config(function($routeProvider){
 	$routeProvider
	 	.when('/:page?',
	 	{
	 		title: 'Search | PH-EITI',
            controller: 'searchController',
	 		templateUrl:'./template/results.html'
	 	})
        .when('/',
        {
            title: 'Search | PH-EITI',
            controller: 'searchController',
            templateUrl:'./template/index.html'
        })
        .otherwise({
            redirectTo: '/'
        });;
}); 

searchApp.config(function($mdThemingProvider) {
	/* Yellow is primary ; Blue is accent 
    var defaultPrimary = {
        '50': '#fede7c',
        '100': '#fed863',
        '200': '#fed149',
        '300': '#fecb30',
        '400': '#fec416',
        '500': '#fabc01',
        '600': '#e1a901',
        '700': '#c79601',
        '800': '#ae8301',
        '900': '#947001',
        'A100': '#ffe495',
        'A200': '#ffebaf',
        'A400': '#fff1c8',
        'A700': '#7b5c00'
    };
    $mdThemingProvider
        .definePalette('defaultPrimary', 
                        defaultPrimary);

    var defaultAccent = {
        '50': '#064475',
        '100': '#08528d',
        '200': '#0960a5',
        '300': '#0a6ebd',
        '400': '#0c7cd5',
        '500': '#0d8aee',
        '600': '#39a1f4',
        '700': '#51adf6',
        '800': '#6ab8f7',
        '900': '#82c4f8',
        'A100': '#39a1f4',
        'A200': '#2196F3',
        'A400': '#0d8aee',
        'A700': '#9acffa'
    };
    $mdThemingProvider
        .definePalette('defaultAccent', 
                        defaultAccent);

    var defaultWarn = {
        '50': '#ffcc80',
        '100': '#ffc166',
        '200': '#ffb74d',
        '300': '#ffad33',
        '400': '#ffa21a',
        '500': '#FF9800',
        '600': '#e68900',
        '700': '#cc7a00',
        '800': '#b36a00',
        '900': '#995b00',
        'A100': '#ffd699',
        'A200': '#ffe0b3',
        'A400': '#ffeacc',
        'A700': '#804c00'
    };
    $mdThemingProvider
        .definePalette('defaultWarn', 
                        defaultWarn);
	
	var defaultBackground = {
        '50': '#ffffff',
        '100': '#ffffff',
        '200': '#ffffff',
        '300': '#ffffff',
        '400': '#fefefe',
        '500': '#f1f1f1',
        '600': '#e4e4e4',
        '700': '#d7d7d7',
        '800': '#cbcbcb',
        '900': '#bebebe',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#b1b1b1'
    };
    $mdThemingProvider
        .definePalette('defaultBackground', 
                        defaultBackground);

	$mdThemingProvider.theme('default')
	   .primaryPalette('defaultPrimary')
	   .accentPalette('defaultAccent')
	   .warnPalette('defaultWarn')
	   .backgroundPalette('defaultBackground')

	// $mdThemingProvider.theme('altTheme')
	//    .primaryPalette('altPrimary')
	//    .accentPalette('altAccent')
	//    .warnPalette('altWarn')
	//    .backgroundPalette('altBackground')
	*/

	/* Blue is primary; Yellow is accent; */
	 var customPrimary = {
        '50': '#4c8cc7',
        '100': '#3b7fbe',
        '200': '#3572aa',
        '300': '#2f6597',
        '400': '#295883',
        '500': '#234b70',
        '600': '#1d3e5d',
        '700': '#173149',
        '800': '#112436',
        '900': '#0b1722',
        'A100': '#5f98cd',
        'A200': '#72a5d3',
        'A400': '#86b1d9',
        'A700': '#050a0f'
    };
    $mdThemingProvider
        .definePalette('customPrimary', 
                        customPrimary);

    var customAccent = {
        '50': '#624900',
        '100': '#7b5c00',
        '200': '#947001',
        '300': '#ae8301',
        '400': '#c79601',
        '500': '#e1a901',
        '600': '#fec416',
        '700': '#fecb30',
        '800': '#fed149',
        '900': '#fed863',
        'A100': '#fec416',
        'A200': '#fabc01',
        'A400': '#e1a901',
        'A700': '#fede7c'
    };
    $mdThemingProvider
        .definePalette('customAccent', 
                        customAccent);

    var customWarn = {
        '50': '#ffb280',
        '100': '#ffa266',
        '200': '#ff934d',
        '300': '#ff8333',
        '400': '#ff741a',
        '500': '#ff6400',
        '600': '#e65a00',
        '700': '#cc5000',
        '800': '#b34600',
        '900': '#993c00',
        'A100': '#ffc199',
        'A200': '#ffd1b3',
        'A400': '#ffe0cc',
        'A700': '#803200'
    };
    $mdThemingProvider
        .definePalette('customWarn', 
                        customWarn);

    var customBackground = {
        '50': '#ffffff',
        '100': '#ffffff',
        '200': '#ffffff',
        '300': '#ffffff',
        '400': '#fefefe',
        '500': '#f1f1f1',
        '600': '#e4e4e4',
        '700': '#d7d7d7',
        '800': '#cbcbcb',
        '900': '#bebebe',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#b1b1b1'
    };
    $mdThemingProvider
        .definePalette('customBackground', 
                        customBackground);

    $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary')
       .accentPalette('customAccent')
       .warnPalette('customWarn')
       .backgroundPalette('customBackground')
	
});

searchApp.service('anchorSmoothScroll', function(){
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
});

searchApp.controller('returnToTopController',['$scope','$location', 'anchorSmoothScroll',
    function($scope,$location,anchorSmoothScroll){

    $scope.scrollTo=function(eID){
        // $location.hash('logo-wrapper');
        anchorSmoothScroll.scrollTo(eID);
    }

}]);

searchApp.factory('homeNewsFactory',['$http',
    function($http){
    var homeNewsFactory = null;
    homeNewsFactory = {
        subscribe : function(data) {
            var promise = $http({
                url:'../rest/functions/newsletter-subscribe.php',
                method: 'POST',
                data:data
            })
            return promise;
        }
    }
    return homeNewsFactory;
}]);

searchApp.controller('footerController',['$scope','homeNewsFactory','$mdDialog','$mdMedia','secretariatContactDetails',
    function($scope,homeNewsFactory,$mdDialog,$mdMedia,secretariatContactDetails){
    
    $scope.userfeedback = { message : '',  type: '' }
    $scope.user = {name : '', email: ''}
    
    $scope.resetFeedback=function(){
        $scope.userfeedback.message = '';
        $scope.userfeedback.type = ''; 
    }

    $scope.resetForm=function(mode){
        $scope.user.name = '';
        $scope.user.email = '';
        if (mode===true){
            $scope.userfeedback.message = '';
            $scope.userfeedback.type = '';
        }
    }

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };

    $scope.triggerSubscribe=function(ev){
        $scope.resetForm(true);
        // var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
            templateUrl: '../template/subscribe-innerpage.html?v=1.02', 
            parent: angular.element(document.getElementById('logo-wrapper')),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true,
            controller:'footerController'
        })
    }

    $scope.subscribe = function() {
        $scope.resetFeedback();
        if ($scope.signupForm.$invalid){
            $scope.userfeedback.message = 'Unable to proceed. Please check the required field.';
            $scope.userfeedback.type = 'error';     
            return false
        }

        if (!$scope.user.email) {
            $scope.userfeedback.message = 'Unable to proceed. Email Address is required.';
            $scope.userfeedback.type = 'error';     
            return false
        }

        $scope.subscribePromise = homeNewsFactory.subscribe($scope.user);
        $scope.subscribePromise.then(function(data){
            if (data.status==200) {
                delete $scope.subscribePromise
                $scope.userfeedback.message = 'Confirmation email sent. Kindly check your inbox and confirm your subscription please.';
                $scope.userfeedback.type = 'success';
                $scope.resetForm();
            }
        })
        .then(null,function(response){
            delete $scope.subscribePromise
            switch(response.status) {
                case 409:
                    $scope.userfeedback.message = 'Error: Email address is already taken.';
                    $scope.userfeedback.type = 'error';     
                    break;
                case 400:
                    $scope.userfeedback.message = 'Unable to process your request. Please try again.';
                    $scope.userfeedback.type = 'error';     
                    break;
            }
        })
    }

    function getContactDetails(){
        $scope.contactDetails = {};
        if (!secretariatContactDetails.info && !localStorage.getItem('secretariatContactDetails')) {
            var getPromise = secretariatContactDetails.get();    
            getPromise.then(function(response){
                secretariatContactDetails.info = response.data.contact;
                localStorage.setItem('secretariatContactDetails',JSON.stringify(secretariatContactDetails.info));
                $scope.contactDetails = response.data.contact;
            },function(error){
                // Error Callback
            });
        }
        else {
            $scope.contactDetails = secretariatContactDetails.info ? secretariatContactDetails.info : JSON.parse(localStorage.getItem('secretariatContactDetails'));
        }   
    }

    getContactDetails();
}]);

searchApp.controller('menuController',['$scope','NavigationFactory','utilsService','$location','$rootScope',
    function($scope,NavigationFactory,utilsService,$location,$rootScope){
        $scope.showMenu = false;
        $scope.main_nav = [];
        $scope.active = {mnav: '', subnav: ''};
        $scope.search = {keyword: ''}

        $scope.getnavigation = function() {
            $scope.main_nav = [];
            if (!NavigationFactory.offline && !localStorage.getItem('navigation')) {
                var mainnav = NavigationFactory.get();
            }
            else {
                var mainnav = NavigationFactory.offline ? NavigationFactory.offline : JSON.parse(localStorage.getItem('navigation'));
            }
            for (var idx=0;idx<mainnav.length;idx++){
                if (mainnav[idx].subnav.length > 0) {
                    mainnav[idx].subnav_open = false;
                    for (var sidx=0;sidx<mainnav[idx].subnav.length;sidx++) {
                        mainnav[idx].subnav[sidx].subnav_open = false;
                        try {
                            if (mainnav[idx].subnav[sidx].subnav.length > 0) {
                                for (var ssidx=0;ssidx<mainnav[idx].subnav[sidx].subnav.length;ssidx++){
                                    mainnav[idx].subnav[sidx].subnav[ssidx].subnav_open = false;
                                }
                            }    
                        }
                        catch(err){

                        }
                    }
                }
            }
            $scope.main_nav = mainnav;
            if ($location.$$absUrl.match(/#/gi)){
                var locs = $location.$$absUrl.split('#');
                var host = locs[0].split('/');
            }
            else {
                var host = $location.$$absUrl.split('/');
            }
            if (utilsService.inObj($scope.main_nav,'href',host[host.length-2])) {
                $scope.active.mnav = utilsService.getObjOtherPropVal($scope.main_nav,'href',host[host.length-2],'id');
            }
            $scope.active.subnav = ''
        }

        $scope.getnavigation();

        $scope.expand=function(nav){
            nav.subnav_open = !nav.subnav_open;
            for (var idx=0;idx<$scope.main_nav.length;idx++){
                if ($scope.main_nav[idx].subnav.length > 0) {
                    if ($scope.main_nav[idx].subnav_open===true && $scope.main_nav[idx].id!==nav.id){
                        $scope.main_nav[idx].subnav_open = false;
                    }
                }
            }
        }

        $scope.collapse=function(nav){
            nav.subnav_open = !nav.subnav_open;
        }

        $rootScope.$on('$routeChangeSuccess', function(next, current) { 
            try {
                $scope.active.subnav = $location.path().split('/')[1];
                for (var idx=0;idx<$scope.main_nav.length;idx++){
                    if ($scope.main_nav[idx].subnav.length > 0) {
                        for (var sidx=0;sidx<$scope.main_nav[idx].subnav.length;sidx++){
                            $scope.main_nav[idx].subnav_open = false;
                        }
                    }
                }
                for (var idx=0;idx<$scope.main_nav.length;idx++){
                    if ($scope.main_nav[idx].subnav.length > 0) {
                        for (var sidx=0;sidx<$scope.main_nav[idx].subnav.length;sidx++){
                            if ($scope.main_nav[idx].subnav[sidx].href === $scope.active.subnav && $scope.main_nav[idx].id===$scope.active.mnav) {
                                $scope.main_nav[idx].subnav_open = true;
                                break;
                            }
                        }
                    }
                }
                if ($route.current.title) {
                    document.title = $route.current.title;  
                }
            }
            catch(err)  {
                
            }
        });

        $scope.$on('keywordEntered',function(evt,searchArgs){
            if (searchArgs) {
                $scope.search.keyword = searchArgs.keyword;
            }
        });

        $scope.doSearch=function(){
            if ($scope.search.keyword==='') {
                return false
            }
            window.location.href = '../search/#/search?keyword='+$scope.search.keyword;
        }

        $scope.validate=function(evt){
            if (evt.keyCode==13) {
                $scope.doSearch();
            }
        }

        $scope.openSearch=function(){
            var searchInput = document.querySelector('#search-input').value;
            var searchElem = document.querySelector('#search-input');
            var searchInput_wd = searchElem.style.width;            
            var clearElem = document.querySelector('#clear-search'); 
            if (searchInput === '') {
                if (searchInput_wd!=='25em') {
                    searchElem.focus();
                    searchElem.style.width = '25em';
                    clearElem.style.visibility = 'visible';
                }
                else {
                    searchElem.style.width = '0';
                    clearElem.style.visibility = 'hidden';   
                }                
            }
            else {
                $scope.doSearch();
            }   
        }

        $scope.closeSearch=function(){
            var searchElem = document.querySelector('#search-input');
            var clearElem = document.querySelector('#clear-search'); 
             if (searchElem.value === '') {
                searchElem.style.width = '0';
                clearElem.style.visibility = 'hidden';   
            }
            else {
                searchElem.value = "";
            }
        }
}]);