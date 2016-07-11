var pheiti = angular.module('pheiti',['ngMaterial','navMod','jkAngularCarousel','ngDialog','cgBusy']);

pheiti.config(function($mdThemingProvider) {
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

pheiti.factory('homeNewsFactory',['$http',
    function($http){
    var homeNewsFactory = null;
    homeNewsFactory = {
        getnews : function(data) {
            var p = $http({
                url:'./rest/functions/news-get-pagination.php',
                method: 'POST',
                data:data
            });
            return p;
        },
        subscribe : function(data) {
            var promise = $http({
                url:'./rest/functions/newsletter-subscribe.php',
                method: 'POST',
                data:data
            })
            return promise;
        }
    }
    return homeNewsFactory;
}]);

pheiti.controller('homeNewsController',['$scope','homeNewsFactory','$sce',
    function($scope,homeNewsFactory,$sce){

    function getNews() {
        $scope.homenews = []
        $scope.lastUpdated = ""
        var obj = {
            id:'',
            section:'PH-EITI in the News',
            published:true,
            page:'index',
            pageLimit:6,
            pageNum:1
        }
        $scope.newspromise = homeNewsFactory.getnews(obj);
        $scope.newspromise.then(function(data){
            if (typeof(data.data) == 'string') {
            }
            else {  
                $scope.homenews = data.data
                for (var i in $scope.homenews) { 
                    if ($scope.homenews[i].brief != null && $scope.homenews[i].brief != '') {
                        $scope.homenews[i].brief = $sce.trustAsHtml('<div style="font-size:13px;">'+shorten($scope.homenews[i].brief,300)+'</div>');
                    }
                    if (i==0) {
                        $scope.lastUpdated = $scope.homenews[i].dateposted
                    }
                }
            }
        })
    }

    function shorten(text, maxLength) {
        var ret = text;
        if (ret.length > maxLength) {
            ret = ret.substr(0,maxLength-3) + "...";
        }
        return ret;
    }

    getNews();

}]);

pheiti.controller('headerCarouselController',['$scope',
    function($scope){
    $scope.headersArr = [
        {
            title: '',
            image: 'images/home-main-carousel/man.png'
        },
        {
            title: 'How EITI works',
            image: 'images/home-main-carousel/eiti-steps.png'
        }
    ]
}]);

pheiti.controller('statementCarouselController',['$scope',
    function($scope){
    $scope.openStatement=function(link){
        window.open('./'+link)
    }
    $scope.statements = [
        {
            statedBy: 'Statement of Benigno S. Aquino III, Former President of the Republic of the Philippines',
            pullquote: 'We will implement the Extractive Industries Transparency Initiative (EITI) in order to improve transparency in the collection and payment of government taxes and other revenues from extractive industries.',
            link: 'document/Statement/Statement-of-the-President.pdf'
        },
        {
            statedBy: 'Message from Cesar V. Purisima, Former Secretary, Department of Finance',
            pullquote: 'Our work does not stop with the release and publication of the first PH-EITI country report. From here, the PH-EITI MSG will begin the challenging task of formulating policies for reforming governance of the extractive sector and enhancing government systems to promote transparency and improve EITI implementation in the country.',
            link: 'document/Statement/Message-from-the-Secretary-of-Finance.pdf'
        }
    ];
}]);


pheiti.controller('homeInfographicController',['$scope','ngDialog',
    function($scope,ngDialog){

    $("#chart-container").highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            marginLeft: 300
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        legend : {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            floating: false,
            itemWidth: 100,
            lineHeight: 48,
            itemMarginTop: 13,
            itemMarginBottom: 13
        },
        series: [{
            name: 'Total Collection',
            colorByPoint: true,
            data: [
                { name: 'Departent of Energy (DOE)', y: 55, sliced: true, selected: true },
                { name: 'Bureau of Internal Revenue (BIR)', y: 40 },
                { name: 'National Commission on Indigenous Peoples (NCIP)', y: 1 },
                { name: 'Mines and Geosciences Bureau (MGB)', y: 2 },
                { name: 'Bureau of Customs (BOC)', y: 1 },
                { name: 'Local Government Unit (LGU)', y: 1 },                
                { name: 'Philippine Ports Authority (PPA)', y: 0 }                
            ]
        }]
    });
    
    $scope.variances = [
        {
            icon:'./images/icons/svg/ic_swap_horiz_black_24px.svg',
            variance:'Difference in accounting frameworks'
        },
        {
            icon:'./images/icons/svg/ic_folder_black_24px.svg',
            variance:'No centralized database'
        },
        {
            icon:'./images/icons/svg/ic_data_usage_black_24px.svg',
            variance:'Disaggregated data'
        },
        {
            icon:'./images/icons/svg/ic_access_time_black_24px.svg',
            variance:'Delayed submission of required schedules and documents to support disclosures made in the templates'
        }
    ]

    $scope.openVariance=function(){
        ngDialog.open({ 
            template: './template/variance.html', 
            className: 'ngdialog-theme-default', 
            scope:$scope,
            closeByDocument: true,
            closeByEscape: true,
            showClose: true
        });
    }    
}]);

pheiti.controller('footerController',['$scope','ngDialog','homeNewsFactory',
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
            template: './template/subscribe.html', 
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