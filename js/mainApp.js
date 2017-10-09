var pheiti = angular.module('pheiti',['ngMaterial','navMod','jkAngularCarousel','secretariatContactMod']);

/* Manual boostrap for the splash screen*/
(function(){
    var htmlBody = document.getElementsByTagName('html')[0];
    setTimeout(function() {
        htmlBody.setAttribute('ng-app', 'pheiti');
        angular.bootstrap(htmlBody, ['ng', 'pheiti']);
    }, 1000);
})();

pheiti.config(function($mdThemingProvider) {
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

pheiti.controller('menuController',['$scope','NavigationFactory','utilsService','$location','$rootScope',
    function($scope,NavigationFactory,utilsService,$location,$rootScope){
        $scope.showMenu = false;
        $scope.main_nav = [];
        $scope.active = {mnav: '', subnav: ''};
        $scope.search = {keyword: ''};

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
            window.location.href = './search/#/search?keyword='+$scope.search.keyword;
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
                    $("#search-input").focus();
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

pheiti.controller('headerCarouselController',['$scope',
    function($scope){
    $scope.headersArr = [
        {
            title: '',
            image: 'images/home-main-carousel/Banner A.png'
        },
        /*{
            title: '',
            image: 'images/home-main-carousel/third-country-report-transparent-compressed.png'
        },*/
        {
            title: '',
            image: 'images/home-main-carousel/eiti-steps-1-transparent.png'
        },
        {
            title: '',
            image: 'images/home-main-carousel/eiti-steps-2b-transparent.png'
        },
        {
            title: '',
            image: 'images/home-main-carousel/eiti-steps-3b-transparent.png'
        },
        {
            title: '',
            image: 'images/home-main-carousel/main-2-transparent.png'
        }
    ]
}]);

pheiti.controller('homeInfographicController',['$scope','$mdDialog','$mdMedia',
    function($scope,$mdDialog,$mdMedia){

    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart-container',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            // marginLeft: 50,
            marginTop: 0,
            // width: 350
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
                size: '105%',
                center: ["50%", "50%"]
            },
            series: {
                point: {
                    events: {
                        legendItemClick: function () {
                            return false; // <== returning false will cancel the default action
                        }
                    }
                }
            }
        },
        legend : {
            // labelFormat: '{name} ({percentage:.1f}%)',
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'middle',
            floating: false,
            // itemWidth: 100,
            itemMarginTop: 0,
            itemMarginBottom: 10,
            useHTML: true,
            itemStyle: { "display": "block", "line-height": "1em", "height": "75px !important", "vertical-align":"text-top" },
            labelFormatter: function() {
                return '<span class="agencyName" style="text-align: left;margin-top:0em;display:block;font-size:0.9em;font-family:Roboto,sans-serif;">' + this.name + ' ('+ this.y +'%)</span> <span class="totalCollection" style="font-size:2em;line-height:1.15em;display:block;font-family:Roboto,sans-serif;">'+ this.yData +'</span>';
            }
        },
        series: [{
            name: 'Total Collection',
            colorByPoint: true,
            data: [
                { name: 'Department of Energy', y: 50.73, yData: 'Php 27,055,539,705',color:'#3182bd'},
                { name: 'Bureau of Internal Revenue', y: 43.22, yData: 'Php 23,047,592,223',color:'#9ecae1'},
                { name: 'Mines and Geosciences Bureau', y: 3.81, yData: 'Php 2,029,816,208',color:'#addd8e'},
                { name: 'Bureau of Customs', y:1.07, yData: 'Php 570,844,638',color:'#feb24c' },
                { name: 'Local Government Unit', y: 0.60, yData: 'Php 320,782,806',color:'#dd1c77'},
                { name: 'National Commission on Indigenous Peoples', y: 0.57, yData: 'Php 303,607,900',color:'#c994c7'}
            ]
        }],
        credits: {
            enabled: false
        }
    });

    // Apply events to text elements (SVG) and spans within the legend (VML + modern browsers with useHTML option).
    $('.highcharts-legend .agencyName , .highcharts-legend .totalCollection').each(function(index, element) {
        $(element).hover(function() {
            var useIdx = null;
            switch(index) {
                case 0 : useIdx = 0; break;
                case 1 : useIdx = 0; break;
                case 2 : useIdx = 1; break;
                case 3 : useIdx = 1; break;
                case 4 : useIdx = 2; break;
                case 5 : useIdx = 2; break;
                case 6 : useIdx = 3; break;
                case 7 : useIdx = 3; break;
                case 8 : useIdx = 4; break;
                case 9 : useIdx = 4; break;
                case 10 : useIdx = 5; break;
                case 11 : useIdx = 5; break;
            }
            // console.log(index)
            // console.log(chart.series[0].data)
            chart.tooltip.refresh(chart.series[0].data[useIdx]);
        },function() {
            chart.tooltip.hide();
        })
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

    $scope.openComparison=function(ev){
        $mdDialog.show({
            templateUrl: './template/see-reports.html?v=1.02', 
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true,
            controller:'compareReportsController'
        })
    }
}]);

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

pheiti.controller('homeNewsController',['$scope','homeNewsFactory','$sce','$location',
    function($scope,homeNewsFactory,$sce,$location){

    function getNews() {
        $scope.homenews = []
        $scope.lastUpdated = ""
        var obj = {
            id:'',
            section:'PH-EITI Newsroom',
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
            delete $scope.newspromise
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

    $scope.goTo=function(link){
        window.location.href = link;
    }

}]);

pheiti.controller('statementCarouselController',['$scope','$sce',
    function($scope,$sce){
    $scope.openStatement=function(link){
        window.open('./'+link)
    }
    $scope.statements = [
        /*{
            statedBy: 'Statement of Benigno S. Aquino III, Former President of the Republic of the Philippines',
            pullquote: 'We will implement the Extractive Industries Transparency Initiative (EITI) in order to improve transparency in the collection and payment of government taxes and other revenues from extractive industries.',
            link: 'document/Statement/Statement-of-the-President.pdf'
        },
        {
            statedBy: 'Message from Cesar V. Purisima, Former Secretary, Department of Finance',
            pullquote: 'Our work does not stop with the release and publication of the first PH-EITI country report. From here, the PH-EITI MSG will begin the challenging task of formulating policies for reforming governance of the extractive sector and enhancing government systems to promote transparency and improve EITI implementation in the country.',
            link: 'document/Statement/Message-from-the-Secretary-of-Finance.pdf'
        }*/
        {
            statedBy: $sce.trustAsHtml('<div><span style="display:block;line-height:1.25em;">Foreword to the Third Country Report</span><strong style="display:block;line-height:1.25em;">President Rodrigo Roa Duterte</strong><span style="display:block;line-height:1.25em;">Republic of the Philippines</span></div>'),
            pullquote: 'Together with the PH-EITI Multi Sectoral Group, it is my hope that this report will ensure that all extractive activities will provide meaningful and impactful opportunities and benefits not just for the economy, but for everyone concerned. I trust that we will continue to abide with the principles that led to its establishment and use it to usher in the just, equitable, and prosperous future we envision for all Filipinos.',
            link: 'document/Statement/2017/03/09/Signed Foreword - 3rd Country Report.pdf'
        },
        {
            statedBy: $sce.trustAsHtml('<div><span style="display:block;line-height:1.25em;">Message from </span><strong style="display:block;line-height:1.25em;">Sec. Carlos G. Dominguez</strong><span style="display:block;line-height:1.25em;">Department of Finance</span></div>'),
            pullquote: '…DOF sees the Philippine EITI as aligned with at least three goals in the Duterte Administration’s ten-point socioeconomic agenda: institute more effective tax collection, increase competitiveness and the ease of doing business, and promote rural and value chain development, as to a critical albeit specific sector.',
            link: 'document/Statement/2017/03/09/DOF Message Signed.pdf'
        }
    ];
}]);

pheiti.controller('footerController',['$scope','homeNewsFactory','$mdDialog','$mdMedia','secretariatContactDetails',
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
            templateUrl: './template/subscribe.html?v=1.02', 
            parent: angular.element(document.body),
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

pheiti.controller('compareReportsController',['$scope','$mdDialog',
    function($scope,$mdDialog){
    $scope.reportsData = [
        {
            periodCovered : 2012,
            publicationDate: "December 2012",
            sectorsCovered: "Oil, Gas, Mining, Coal",
            govtRevenues: 1203,
            companyPayments:1270,
            numCompaniesReporting:36
        },
        {
            periodCovered : 2013,
            publicationDate: "December 2015",
            sectorsCovered: "Oil, Gas, Mining, Coal",
            govtRevenues: 982,
            companyPayments:990,
            numCompaniesReporting:36
        }
    ]

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };

}]);


pheiti.controller('bannerFeatureController',['$scope','$mdDialog',
    function($scope,$mdDialog){

    $scope.openValidationDetails=function(ev){
        $mdDialog.show({
            templateUrl: './template/validation-details.html?v=1.0', 
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true,
            controller:'bannerFeatureController'
        })
    }

    $scope.closeDialog = function() {
        $mdDialog.hide();
    };

}]);