var activitiesApp = angular.module('activities',['ngRoute','ngSanitize','ngCookies','navMod','ngMaterial','utilsModule','ngDialog','cgBusy']);

activitiesApp.config(function($routeProvider){
    $routeProvider
    .when('/',
    {
        controller:'ActivitiesController',
        templateUrl:'template/index.html'
    })
    .when('/:id',
    {
        controller: 'ActivitiesController',
        templateUrl: 'template/view.html'
    })
    .otherwise({
        redirectTo:'/'
    })
});

activitiesApp.config(function($mdThemingProvider) {

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

activitiesApp.service('anchorSmoothScroll', function(){
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

activitiesApp.controller('returnToTopController',['$scope','$location', 'anchorSmoothScroll',
    function($scope,$location,anchorSmoothScroll){

    $scope.scrollTo=function(eID){
        // $location.hash('logo-wrapper');
        anchorSmoothScroll.scrollTo(eID);
    }

}]);

activitiesApp.factory('homeNewsFactory',['$http',
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

activitiesApp.controller('footerController',['$scope','ngDialog','homeNewsFactory',
    function($scope,ngDialog,homeNewsFactory){

    $scope.userfeedback = { message : '',  type: '' }
    $scope.user = {name : '', email: ''}

    $scope.resetForm=function(){
        $scope.user.name = ''
        $scope.user.email = ''
        $scope.userfeedback.message = '';
        $scope.userfeedback.type = ''; 
    }

    $scope.triggerSubscribe=function(){
        $scope.resetForm();
        ngDialog.open({ 
            template: '../template/subscribe-innerpage.html', 
            className: 'ngdialog-theme-default', 
            scope:$scope,
            closeByDocument: true,
            closeByEscape: true,
            showClose: true
        });
    }

    $scope.subscribe = function() {
        $scope.subscribePromise = homeNewsFactory.subscribe($scope.user);
        $scope.subscribePromise.then(function(data){
            if (data.status==200) {
                $scope.userfeedback.message = 'Confirmation email sent. Kindly check your inbox please, to confirm your subscription.';
                $scope.userfeedback.type = 'success';
                $scope.resetForm();
                // ngDialog.closeAll();
            }
        })
        .then(null,function(response){
            switch(response.status) {
                case 409:
                    $scope.userfeedback.message = 'Conflict: Email address is already taken.';
                    $scope.userfeedback.type = 'error';     
                    break;
                case 400:
                    $scope.userfeedback.message = 'Unable to process your request. Please try again.';
                    $scope.userfeedback.type = 'error';     
                    break;
            }
        })
    }
}]);