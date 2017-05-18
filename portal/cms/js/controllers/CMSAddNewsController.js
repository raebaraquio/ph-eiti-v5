var scope;
cms.controller('CMSAddNewsController',['$scope','NewsFactory','$location','$sce','UploadFactory','CMSFactory','sessionService',
	function($scope,NewsFactory,$location,$sce,UploadFactory,CMSFactory,sessionService){
	scope = $scope;
	$scope.article = {
		sectionHref:"",
		section: ""
	}
	if (sessionService.inSession()===false) {
		window.location.href = '../../portal/';
	}
	if (!localStorage.getItem('uploadfiles')){
		localStorage.setItem('uploadfiles',[])
	}
	// Model Declarations
	$scope.user = {
		id:sessionService.userProperty('id'),
		name:sessionService.userProperty('name'),
		position:sessionService.userProperty('position'),
		email:sessionService.userProperty('email'),
		mobile:sessionService.userProperty('mobile'),
		piclocation:sessionService.userProperty('piclocation')
	}
	$scope.maxfilesize = {
		'picture' : 500000
	}
	$scope.usefilesize = $scope.maxfilesize['picture']
	
	if ($scope.user.mobile === undefined) {
		$scope.user.mobile = ''	
	}

	$scope.selectedContent = "News"
	$scope.filter = { category:"" }

	var loc = $location.path().split('/')
	$scope.filter.category = loc[loc.length-1];
	$scope.article.sectionHref = loc[loc.length-1];
	$scope.article.section = loc[loc.length-1];
	switch($scope.filter.category) {
		case "EITI in other Countries" : $scope.article.sectionHref = "EITI-in-other-Countries"; break;
		case "Blogs" : $scope.article.sectionHref = "Blogs"; break;
		case "News" : $scope.article.sectionHref = "News"; break;
		case "MSG Member of the Month" : $scope.article.sectionHref = "MSG-Member-of-the-Month"; break;
	}
	$scope.steps = ["Purpose","Details","Media","Content","Save"]
	$scope.activeStory = "Purpose"
	$scope.continueOpts = ["Continued","Continue reading","Read more"]
	$scope.entry = {}
	$scope.newsletterArticle = null
	$scope.pictureOpts = { applicable: null, multiple: false }  // Contain boolean - True if the article contains pictures; multiple boolean - false by default, true otherwise
	$scope.mediaFiles = []
	$scope.inlineFeedback = { type: '', message: '' }	
	$scope.invalidField = ""
	// END: Model Declarations

	$scope.traverse = function(v) {
		$scope.toggleInlineFeedback('reset',null,null,null);
		
		if (v=='Details') {
			if ($scope.newsletterArticle===null || $scope.newsletterArticle===undefined) {
				$scope.toggleInlineFeedback('show','error', 'Unable to proceed. Please select Yes or No.','add');
				return false
			}
		}
		
		if (v!=='Details' && v!=='Purpose') {
			if (!$scope.entry.pk) {
				$scope.toggleInlineFeedback('show','error', 'Unable to proceed. Kindly accomplish and save Details page first.','add');
				return false
			}
		}

		switch(v) {
			case 'Media':
				// Get Uploaded Pictures First
				$scope.getMediaFiles()
				break;
			case 'Save':
				break;
			case 'Content':
				break;
		}

		$scope.activeStory = v
	}

	

	$scope.validateForm = function(currForm,nextForm){
		$scope.toggleInlineFeedback('reset',null,null,null);
		$scope.setInvalid('')
		switch(currForm) {
			case 'Details':
				var fieldId = "detailsForm-";
				/*if ($scope.addFormDetails.$invalid) {
					$scope.toggleInlineFeedback('show','error', 'Unable to proceed. Kindly fill out the required fields.','add');
					return false;
				}*/

				if (!$scope.entry.title) {
					$scope.setInvalid(fieldId+'title')
					$scope.toggleInlineFeedback('show','error', 'Title is required.','add');
					return false
				}

				$scope.entry.id = $scope.entry.title
				if ($scope.entry.title.match(/ /i)) {
					var title = $scope.entry.title.split(' ');
					$scope.entry.id = title.join('-');	
				}
				
				// check for: source url, source, date posted
				if ($scope.newsletterArticle===false) {
					if (!$scope.entry.sourceurl) {
						$scope.setInvalid(fieldId+'sourceurl')
						$scope.toggleInlineFeedback('show','error', 'Source URL is required.','add');
						return false		
					}
					if (!$scope.entry.source) {
						$scope.setInvalid(fieldId+'source')
						$scope.toggleInlineFeedback('show','error', 'Source (name) is required.','add');
						return false		
					}	
				}

				if (!$scope.entry.dateposted) {
					$scope.setInvalid(fieldId+'dateposted')
					$scope.toggleInlineFeedback('show','error', 'Date posted is required.','add');
					return false		
				}

				if (!$scope.entry.readmore) {
					$scope.setInvalid(fieldId+'continuelink')
					$scope.toggleInlineFeedback('show','error', 'Read more/Continue link is required.','add');
					return false
				}

				if (!$scope.entry.excerpt) {
					$scope.setInvalid(fieldId+'excerpt')
					$scope.toggleInlineFeedback('show','error', 'Excerpt is required.','add');
					return false
				}

				$scope.entry.createdBy = $scope.user.name
				$scope.entry.section = $scope.article.section;//'News and Events'
				$scope.save(currForm,nextForm)
				break;

			case 'Media':
				break;

			case 'Content':
				var fieldId = "articleContent";
				if (!$scope.entry.content) {
					$scope.setInvalid(fieldId)
					$scope.toggleInlineFeedback('show','error', 'Content is required.','add');
					return false
				}
				$scope.entry.createdBy = $scope.user.name
				$scope.save(currForm,nextForm)
				break;

			case 'Save':
				if (!$scope.entry.pk) {
					$scope.toggleInlineFeedback('show','error', 'Article ID not found.','add');
					return false
				}
				$scope.entry.createdBy = $scope.user.name
				$scope.save(currForm,nextForm)
				break;
		}
	}

	$scope.save = function(currForm,nextForm){
		// After
		switch(currForm) {
			case 'Details':
				// Insert promise
				if ($scope.entry.section == 'News') {
					$scope.entry.section = 'News and Events'
				}
				$scope.savePromise = CMSFactory.news.add($scope.entry)
				$scope.savePromise.then(function(response){
					if (response.data) {
						if (response.data.newspk) {
							$scope.entry.pk = response.data.newspk
							$scope.traverse(nextForm);
							$scope.setElemValue('newsfk',$scope.entry.pk)
						}
					}
				}, function(err){
					console.log(err)
				})
				break;

			case 'Media':
				// Upload promise
				if (!$scope.uploadData) {
					var form = document.getElementById('add-form-Media')
					if ($scope.addAnother===true) {
						// Reset Form
						$scope.addAnother = null
						form.reset()
						return false
					}	
				}
				break;

			case 'Content':
				// Update or just go to save
				// Insert promise
				console.log($scope.entry)
				$scope.savePromise = CMSFactory.news.update($scope.entry)
				$scope.savePromise.then(function(response){
					if (response.data) {
						if (response.data.success) {
							$scope.traverse(nextForm);	
						}
					}
				}, function(err){
					console.log(err)
				})
				break;

			case 'Save':
				// Update promise
				$scope.entry.publish = "publish"
				$scope.savePromise = CMSFactory.news.update($scope.entry)
				$scope.savePromise.then(function(response){
					if (response.data) {
						if (response.data.success) {
							$scope.toggleInlineFeedback('show','success', 'Article published.','add');
							return false
						}
					}
				}, function(err){
					console.log(err)
				})
				break;
		}
	}

	$scope.type_of = function(v){
		return (typeof(v))
	}

	$scope.toggleMedia = function(mode,p){
		if (mode=='reset') {
			$scope.pictureOpts.applicable=null;
			var form = document.getElementById('add-form-Media');
			form.reset()
		}	
		else if (mode=='flag') {			
			$scope.pictureOpts.applicable = p			
		}
	}

	
	$scope.toggleInlineFeedback = function(action,type,msg,form) {
		var objDefault = {}
		if (action=='reset') { 
			angular.copy(objDefault, $scope.inlineFeedback)
		}
		else {
			$scope.inlineFeedback.type = type
			$scope.inlineFeedback.message = msg
		}
	}

	$scope.chooseFile = function(){
		var inputFile = document.getElementById('uploadFile')
		inputFile.click()
	}

	/* Tinymce content
	tinymce.init({
		mode : "exact",
		selector: "textarea#articleContent",
		plugins: [
			"autolink link image lists preview",
			"searchreplace wordcount code fullscreen insertdatetime media",
			"save table paste textcolor colorpicker",
			"imagetools"
		],
		theme: "modern",
		content_css: "css/development.css",
		height:350,
		add_unload_trigger: false
	});
	*/

	$scope.tinymceopts = {
		plugins: [
			"autolink link image lists preview",
			"searchreplace wordcount code fullscreen insertdatetime media",
			"save table paste textcolor colorpicker",
			"imagetools"
		],
		theme: "modern",
		content_css: "css/development.css",
		height:350,
		add_unload_trigger: false
	}

	$scope.mediaupload = {
		file : null,
		contentSection : "Newsletter",
		uploadType : "picture",
		uploadedBy : $scope.user.name
	}
	
	$scope.$watch('uploadData', function(v){
		if (v){
			$scope.getMediaFiles()
			if (!$scope.addAnother || $scope.addAnother===false) {
				$scope.traverse('Content')	
			}
			var form = document.getElementById('add-form-Media')
			form.reset();
		}
	});

	$scope.setInvalid = function(id) {
		if (id) {
			$scope.invalidField = id
			return
		}
		$scope.invalidField = ""
		return
	}

	$scope.setElemValue = function(id,val) {
		var elem = document.getElementById(id)
		elem.value = val
	}

	$scope.setElemValue('uploadedBy',$scope.user.name)

	if ($scope.entry.pk) {
		$scope.setElemValue('newsfk',$scope.entry.pk)
	}

	$scope.getMediaFiles = function(){
		$scope.mediaFiles = []
		$scope.getPromise = CMSFactory.media.get($scope.entry)
		$scope.getPromise.then(function(response){
			var mediaFiles = []
			if (response.data) {
				mediaFiles = response.data.data
				for (var idx in mediaFiles) {
					var filename = mediaFiles[idx].filename
					try {
						var href = mediaFiles[idx].folderdestination	
					} catch(err) {}
					if (href) {
						if (href.match('../../')) {
							var currhref = href.split('../../')
							mediaFiles[idx].hrefDisplay = window.location.origin+'/'+currhref[1]+'/'+filename
							mediaFiles[idx].href = href+'/'+filename
						}
					}
				}
			}
			$scope.mediaFiles = mediaFiles
		}, function(err){
			console.log(err)
		})
	}

	$scope.previewFile = function(vl) {
		if (vl) {
			window.open(vl.href)
		}
	}

	$scope.doCopy = function(e,vl,idx){
		if (vl) {
			var elem = document.getElementById('link-'+idx)
			elem.select()
			try {
				var successful = document.execCommand('copy');
				var msg = successful ? 'successful' : 'unsuccessful';
				console.log('Copying text command was ' + msg);
			} catch (err) {
				console.log('Oops, unable to copy');
			}
		}
	}

	$scope.clearContent = function() {
		if ($scope.entry.content) {
			$scope.entry.content = ""
		}
	}

	$scope.finish = function(){
		$location.path("News")
	}

}]);

function uploadReturn() {
	var iframe = document.getElementById('addForMedia-iframe')
	var returnData = iframe.contentDocument.body.innerHTML;
	var errorLib = {
    	"unsubmitted": {
    		action : "reset",
    		type: null,
    		msg: null
    	},
    	"missing-uploadType": {
    		action: "show",
    		type: "error",
    		msg : "Unable to proceed. Missing upload type. Please contact the Site Admin.",    		
    	},
    	"missing-contentSection": {
    		action: "show",
    		type: "error",
    		msg : "Unable to proceed. Missing content section. Please contact the Site Admin."
    	},
    	"nofile": {
    		action: "show",
    		type: "error",
    		msg : "Unable to proceed. No file attached."
    	},
    	"toolarge": {
    		action: "show",
    		type: "error",
    		msg : "Unable to proceed. File size is over the limit. Kindly upload with no more than 500KB.",
    	},
    	"invalidFormat": {
    		action: "show",
    		type: "error",
    		msg : "Unable to proceed. Invalid file format.",
    	},
    	"fileuploaded": {
    		action: "show",
    		type: "success",
    		msg : "File successfully uploaded.",
    	},
    	"folderError": {
    		action: "show",
    		type: "error",
    		msg : "Unable to proceed. Destination folder cannot be created.",
    	},
    	"fileExists": {
    		action: "show",
    		type: "error",
    		msg : "Looks like you have already uploaded the file before. Kindly edit the filename then try again."
    	},
    	"uploaderror": {
    		action: "show",
    		type: "error",
    		msg : "Unable to proceed. An error occurred while uploading."
    	}
    }
	
	if (scope) {
		if (returnData!=="unsubmitted" && returnData!=="") {
			var responseData = JSON.parse(returnData)
			var status = responseData['status'];
			if (errorLib[status].action){
				scope.toggleInlineFeedback(errorLib[status].action,errorLib[status].type,errorLib[status].msg,'upload-media')
				scope.uploadData = JSON.parse(returnData)		
			}
		}
		scope.$apply()
	}
}