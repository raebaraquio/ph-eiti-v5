var pheiti = angular.module('pheiti',['ngMaterial','navMod']);

pheiti.config(function($mdThemingProvider) {
	/* Yellow is primary ; Blue is accent */
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
	

	/* Blue is primary; Yellow is accent;
	  var customPrimary = {
        '50': '#8bc8f0',
        '100': '#74bded',
        '200': '#5eb3ea',
        '300': '#47a8e7',
        '400': '#309de4',
        '500': '#1d92de',
        '600': '#1a83c7',
        '700': '#1774b1',
        '800': '#14659a',
        '900': '#115784',
        'A100': '#a1d3f3',
        'A200': '#b8ddf6',
        'A400': '#cee8f9',
        'A700': '#0e486d'
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
        '50': '#f3c195',
        '100': '#f0b37e',
        '200': '#eea667',
        '300': '#eb9950',
        '400': '#e98b39',
        '500': '#e67e22',
        '600': '#d67118',
        '700': '#bf6516',
        '800': '#a85913',
        '900': '#924d10',
        'A100': '#f6ceab',
        'A200': '#f8dcc2',
        'A400': '#fbe9d9',
        'A700': '#7b410e'
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
    */
	
});

/* ph.config(function($routeProvider){
 	$routeProvider
 	.when()
}); */

pheiti.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    // .primaryPalette('pink')
    // .accentPalette('orange');
});
