var scope;
cms.controller('CMSEditNewsController',['$scope','NewsFactory','$location','$sce','UploadFactory','CMSFactory','sessionService',
	function($scope,NewsFactory,$location,$sce,UploadFactory,CMSFactory,sessionService){
	
	scope = $scope;
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
	var loc = $location.path().split('/')
	$scope.article = {
		sectionHref:"",
		section: ""
	}
	$scope.article.sectionHref = loc[1];
	switch(loc[1]) {
		case "EITI-in-other-Countries" : $scope.article.section = "EITI in other Countries"; break;
		case "Blogs" : $scope.article.section = "Blogs"; break;
		case "News" : $scope.article.section = "News and Events "; break;
		case "MSG-Member-of-the-Month" : $scope.article.section = "MSG Member of the Month"; break;
		default: $scope.article.section = loc[1]; break;
	}
	$scope.steps = ["Details","Media","Content","Save"];
	$scope.activeStory = "Details";
	$scope.continueOpts = ["Continued","Continue reading","Read more"];
	$scope.entry = {};
	$scope.newsletterArticle = null;
	$scope.pictureOpts = { applicable: null, multiple: false };  // Contain boolean - True if the article contains pictures; multiple boolean - false by default, true otherwise
	$scope.mediaFiles = [];
	
	$scope.invalidField = ""
	var feedbackObj = { type:"",message:""}
	var confirmationObj =  { msg: "", question: "", option: { yes: { label: "", action: function() {} }, no: { label: "", action: function() {} } } }

	$scope.modelAssign = function(copyObj){
		var scopeModel=null
		return angular.copy(copyObj,scopeModel)
	}

	$scope.detailsFeedback = { edit:$scope.modelAssign(feedbackObj) } 
	$scope.confirmation = { edit:$scope.modelAssign(confirmationObj) }
	// END: Model Declarations

	$scope.traverse = function(v) {
		$scope.toggleInlineFeedback('reset',null,null,null);
		
		if (v!=='Details' && v!=='Purpose') {
			if (!$scope.entry.pk) {
				$scope.toggleInlineFeedback('show','error', 'Unable to proceed. Kindly accomplish and save Details page first.','edit');
				return false
			}
		}

		switch(v) {
			case 'Media':
				// Get Uploaded Pictures scope
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
		$scope.setInvalid('');

		if (loc[1]) {
			switch(loc[1]) {
				case "EITI-in-other-Countries" : $scope.entry.section = "EITI in other Countries"; break;
				case "Blogs" : $scope.entry.section = "Blogs"; break;
				case "News" : $scope.entry.section = "News and Events "; break;
				case "MSG-Member-of-the-Month" : $scope.entry.section = "MSG Member of the Month"; break;
				default:
					$scope.entry.section = loc[1];
					break;
			}
		}
		switch(currForm) {
			case 'Details':
				var fieldId = "detailsForm-";
				/*if ($scope.addFormDetails.$invalid) {
					$scope.toggleInlineFeedback('show','error', 'Unable to proceed. Kindly fill out the required fields.','edit');
					return false;
				}*/

				if (!$scope.entry.title) {
					$scope.setInvalid(fieldId+'title')
					$scope.toggleInlineFeedback('show','error', 'Title is required.','edit');
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
						$scope.toggleInlineFeedback('show','error', 'Source URL is required.','edit');
						return false		
					}
					if (!$scope.entry.source) {
						$scope.setInvalid(fieldId+'source')
						$scope.toggleInlineFeedback('show','error', 'Source (name) is required.','edit');
						return false		
					}	
				}

				if (!$scope.entry.dateposted) {
					$scope.setInvalid(fieldId+'dateposted')
					$scope.toggleInlineFeedback('show','error', 'Date posted is required.','edit');
					return false		
				}

				if (!$scope.entry.readmore) {
					$scope.setInvalid(fieldId+'continuelink')
					$scope.toggleInlineFeedback('show','error', 'Read more/Continue link is required.','edit');
					return false
				}

				if (!$scope.entry.excerpt) {
					$scope.setInvalid(fieldId+'excerpt')
					$scope.toggleInlineFeedback('show','error', 'Excerpt is required.','edit');
					return false
				}

				$scope.entry.createdBy = $scope.user.name;
				$scope.entry.section = $scope.article.section;
				$scope.save(currForm,nextForm)
				break;

			case 'Media':
				break;

			case 'Content':
				var fieldId = "articleContent";
				if (!$scope.entry.content) {
					$scope.setInvalid(fieldId)
					$scope.toggleInlineFeedback('show','error', 'Content is required.','edit');
					return false
				}
				$scope.entry.createdBy = $scope.user.name
				$scope.save(currForm,nextForm)
				break;

			case 'Save':
				if (!$scope.entry.pk) {
					$scope.toggleInlineFeedback('show','error', 'Article ID not found.','edit');
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
				var obj = {
					pk :  parseInt($scope.entry.pk,10),
					author : $scope.entry.author,
					lastupdatedby: $scope.user.name,
					brief: $scope.entry.excerpt,
					readmore_label:$scope.entry.readmore,
					readmore_sourcewebsite:$scope.entry.source, // Website Name
					readmore_source:$scope.entry.sourceurl, // URL
					subhead:$scope.entry.subtitle,
					title: $scope.entry.title,
					id: $scope.entry.id,
					action: currForm
				}
				// Edit promise
				$scope.savePromise = CMSFactory.news.edit(obj)
				$scope.savePromise.then(function(response){
					if (response.data) {
						if (response.data.msg== currForm+' updated.') {
							$scope.traverse(nextForm);
						}
					}
				}, function(err){
					if (err.data) {
						if (err.data.error) {
							$scope.toggleInlineFeedback('show','error',err.data.error,'edit');		
						}
					}
				})
				return false;
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
				var obj = {
					pk :  parseInt($scope.entry.pk,10),
					lastupdatedby: $scope.user.name,
					content : $scope.entry.content,
					action: currForm
				}
				// Edit promise
				$scope.savePromise = CMSFactory.news.edit(obj)
				$scope.savePromise.then(function(response){
					if (response.data) {
						if (response.data.msg== currForm+' updated.') {
							$scope.traverse(nextForm);
						}
					}
				}, function(err){
					if (err.data) {
						if (err.data.error) {
							$scope.toggleInlineFeedback('show','error',err.data.error,'edit');		
						}
					}
				})
				break;

			case 'Save':
				// Update promise
				$scope.entry.publish = "publish"
				$scope.savePromise = CMSFactory.news.update($scope.entry)
				$scope.savePromise.then(function(response){
					if (response.data) {
						if (response.data.success) {
							$scope.toggleInlineFeedback('show','success', 'Article published.','edit');
							return false
						}
					}
				}, function(err){
					if (err.data) {
						if (err.data.error) {
							$scope.toggleInlineFeedback('show','error',err.data.error,'edit');		
						}
					}
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

	$scope.chooseFile = function(){
		var inputFile = document.getElementById('uploadFile')
		inputFile.click()
	}

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
		$location.path($scope.article.sectionHref);
	}

	// ============
	$scope.article = {
		sectionHref:"",
		section: ""
	}

	var loc = $location.path().split("/")
	$scope.article.sectionHref = loc[1];
	var pk = parseInt(loc[loc.length-1],10);
	
	switch(loc[1]) {
		case "EITI-in-other-Countries" : $scope.article.section = "EITI in other Countries"; break;
		case "Blogs" : $scope.article.section = "Blogs"; break;
		case "News" : $scope.article.section = "News and Events "; break;
		case "MSG-Member-of-the-Month" : $scope.article.section = "MSG Member of the Month"; break;
		default:
			$scope.article.section = loc[1];
			break;
	}

	var get = {
		news : function() {
			
			$scope.entry = {}
			$scope.newsandevents = [];
			
			var obj = {
				id:'',
				section:$scope.article.section,
				published:null,
				page:'index',
				pk: pk 
			}
			
			$scope.newspromise = NewsFactory.getnews(obj);
			$scope.newspromise.then(function(data){
				if (typeof(data.data) == 'string') {

				}
				else {
					if (data.data) {
						if (data.data.length==1) {
							$scope.entry = data.data[0]
							$scope.entry.content = $sce.trustAsHtml('<div style="font-size:13px;">'+$scope.entry.content+'</div>');
						}
					}
				}
			})
		}
	}

	if (pk) {
		get.news();
		$scope.setElemValue('uploadedBy',$scope.user.name);
		$scope.setElemValue('newsfk',pk);
	}

	$scope.resetConfirmation = function(){
		if ($scope.confirmation) {
			for (var k in $scope.confirmation) {
				// $scope.confirmation = {}
				$scope.confirmation[k].msg = "" 
				$scope.confirmation[k].question = ""
				$scope.confirmation[k].option = {}
				$scope.confirmation[k].option.yes = {}
				$scope.confirmation[k].option.yes.label = ""
				$scope.confirmation[k].option.action = null
				$scope.confirmation[k].option.no = {}
				$scope.confirmation[k].option.no.label = ""
				$scope.confirmation[k].option.no.action = null	
			}
		}						
	}

	$scope.cancelAction = function(){
		// Hide x Reset Confirmation Message 
		$scope.resetConfirmation()
	}

	$scope.toggleInlineFeedback = function(action,type,msg,mode) {
		var objDefault = {}
		if (action=='reset') { 
			$scope.invalidField = ""
			for (var k in $scope.detailsFeedback) {
				if (!mode || mode===k) {
					angular.copy(objDefault, $scope.detailsFeedback[k])	
				}
			}
		}
		else {
			$scope.detailsFeedback[mode].type = type
			$scope.detailsFeedback[mode].message = msg
		}
	}
}]);

function uploadEditReturn() {
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
				scope.toggleInlineFeedback(errorLib[status].action,errorLib[status].type,errorLib[status].msg,'edit')
				scope.uploadData = JSON.parse(returnData)		
			}
		}
		scope.$apply()
	}
}