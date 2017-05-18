secretariat.controller('CMNewsController',['$scope','$location','$cookies','$cookieStore','$window','CMNewsFactory',
	function($scope,$location,$cookies,$cookieStore,$window,CMNewsFactory){

	if ( !$cookieStore.get("user") ) {  
    	$window.location.href = '../../login/';
    }

    $scope.user = $cookieStore.get('user');

    $("#unav-Content-Management").addClass('unav-selected');
	$(".unav").not("#unav-Content-Management").removeClass('unav-selected');

	$('#newsform-newsbody').tinymce({
		// Location of TinyMCE script
		script_url : './tinymce/jscripts/tiny_mce/tiny_mce.js',

		// General options
		theme : "advanced",
		plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",

		// Theme options
		theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
		theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
		theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,advhr,|,ltr,rtl,|,fullscreen",
		// theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
		// theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,visualchars,nonbreaking,template,pagebreak",
		theme_advanced_toolbar_location : "top",
		theme_advanced_toolbar_align : "left",
		theme_advanced_statusbar_location : "bottom",
		theme_advanced_resizing : true,

		// Example content CSS (should be your site CSS)
		content_css : "./tinymce/examples/css/content.css",
		paste_data_images: true,
		// Drop lists for link/image/media/template dialogs
		// template_external_list_url : "lists/template_list.js",
		// external_link_list_url : "lists/link_list.js",
		// external_image_list_url : "lists/image_list.js",
		// media_external_list_url : "lists/media_list.js",

		// Replace values for the template plugin
		template_replace_values : {
			username : "Some User",
			staffid : "991234"
		}
	});

	$scope.newandeventssections = []
	function getsections() {
		var sections = CMNewsFactory.getsections();
		$scope.newandeventssections = []
		$scope.newandeventssections = sections;
	}

	getsections();

	$scope.section_selected = ''
	$scope.setSection = function(s,idx) {
		$scope.section_selected = s
		$scope.crumbnavigate('appearance');
	}

	$scope.selectedcrumb = ''
	$scope.crumbnavigate = function(c) {
		$scope.selectedcrumb = c;
	}

	$scope.newsentry = {}
	$scope.saveNews = function(publish) {
		// $scope.newsentry.id 
		var title = $scope.newsentry.title.split(' ');
		$scope.newsentry.id = title.join('-');
		$scope.newsentry.section = $scope.section_selected
		$scope.newsentry.contentbody = $("#newsform-newsbody").val();
		$scope.newsentry.created_by = $scope.user.fullname
		$scope.newsentry.published = publish
		var promise = CMNewsFactory.newentry($scope.newsentry);
		promise.then(function(data){
if (isNaN(parseInt(data.data,10))) {
	alert('An error occured. Please check the log.');
	console.log(data.data)
}
else {
	alert('News posted successfully. ');
	if (data.data) {
		window.location.reload()
	}
}

		})
	}
}])


                            