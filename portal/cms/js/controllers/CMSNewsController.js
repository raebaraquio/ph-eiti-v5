cms.controller('CMSNewsController',['$scope','NewsFactory','$location','$sce','CMSFactory','sessionService',
	function($scope,NewsFactory,$location,$sce,CMSFactory,sessionService){

	if (sessionService.inSession()===false) {
		window.location.href = '../../portal/';
	}
	
	$scope.user = {
		id:sessionService.userProperty('id'),
		name:sessionService.userProperty('name'),
		position:sessionService.userProperty('position'),
		email:sessionService.userProperty('email'),
		mobile:sessionService.userProperty('mobile'),
		piclocation:sessionService.userProperty('piclocation')
	}
	
	if ($scope.user.mobile === undefined) {
		$scope.user.mobile = ''	
	}
	var loc = $location.path().split('/')
	$scope.contentTypes = ["Home","News","Documents","Activities","Announcements","Infographics"]
	$scope.selectedContent = "News"

	// $scope.categories = ["News","EITI in other Countries","Blogs","MSG Member of the Month"];
	$scope.categories = ["PH-EITI Newsroom","PH-EITI in the News","Media Releases"];
	$scope.pubishedOptions = ["Published","Unpublished","Archived"]
	$scope.selectedCategory = "PH-EITI Newsroom"
	$scope.filter = {
		category: "PH-EITI Newsroom",
		published:"Published"
	}
	switch(loc[1]) {
		case "EITI-in-other-Countries" : 
			$scope.filter.category = "EITI in other Countries"; 
			$scope.selectedCategory = "EITI in other Countries"; 
			break;
		case "Blogs" : 
			$scope.filter.category = "Blogs"; 
			$scope.selectedCategory = "Blogs"; 
			break;
		case "News" : 
			$scope.filter.category = "PH-EITI Newsroom"; 
			$scope.selectedCategory = "PH-EITI Newsroom";
			// $scope.filter.category = "News"; 
			// $scope.selectedCategory = "News and Events";
			break;
		case "MSG-Member-of-the-Month":
			$scope.filter.category = "MSG Member of the Month";
			$scope.selectedCategory = "MSG Member of the Month";
			break;
		default: 
			$scope.filter.category = loc[1]; 
			$scope.selectedCategory = loc[1];
	}
	$scope.setPublished = function(p) {
		$scope.filter.published=p
		get.total()
		if ($scope.inlineFeedback.message) {
			$scope.toggleInlineFeedback('reset',null,null,null);
		}
	}

	// -----


	$scope.lastUpdated = ""
	$scope.nearticle = {}
	$scope.totalNum = 0
	$scope.page = {
		limit : "5",
		num: 1
	}
	$scope.newspages = []
	var get = {
		total: function() {
			var obj = {
				section:$scope.selectedCategory,
				published:$scope.filter.published,
				page:'index'
			}
			var p = NewsFactory.get.total(obj);
			p.then(function(data){
				if (typeof(data.data) == 'string') {

				}
				else {
					if (data.data.count) {
						$scope.totalNum = data.data.count
						$scope.determineOffset()
					}
				}
			})
		},
		pages : function() {
			$scope.nearticle = {}
			$scope.newsandevents = []
			$scope.lastUpdated = ""
			var obj = {
				section:$scope.selectedCategory,
				published:$scope.filter.published,
				pageLimit:$scope.page.limit,
				pageNum:$scope.page.num
			}
			$scope.newspromise = NewsFactory.get.pages(obj);
			$scope.newspromise.then(function(data){
				if (typeof(data.data) == 'string') {

				}
				else {
					$scope.newsandevents = data.data
					for (var i in $scope.newsandevents) { 
						if ($scope.newsandevents[i].brief != null && $scope.newsandevents[i].brief != '') {
							$scope.newsandevents[i].brief = $sce.trustAsHtml('<div style="font-size:13px;">'+shorten($scope.newsandevents[i].brief,145)+'</div>');
						}
						if (i==0) {
							$scope.lastUpdated = $scope.newsandevents[i].dateposted
						}
					}
				}
				delete $scope.newspromise;
			})
		}
	}

	get.total();

	$scope.determineOffset = function(action) {
		
		$scope.newspages = []
		var newspages = []
		var numpages = Math.floor($scope.totalNum / parseInt($scope.page.limit,10))
		var extra = $scope.totalNum%(parseInt($scope.page.limit,10))
		
		if (extra > 0) {
			numpages = numpages + 1
		}
		for (var i=1;i<=numpages;i++) {
			newspages.push(i)
		}
		$scope.newspages = newspages;

		if (!$scope.page.num){
			$scope.page.num = 1;
		}

		if (action) {
			if (action=="p") {
				$scope.page.num = $scope.page.num-1;
			}
			else if (action=="n") {
				$scope.page.num = $scope.page.num+1;	
			}	
		}
		get.pages()
	}

	function shorten(text, maxLength) {
	    var ret = text;
	    if (ret.length > maxLength) {
	        ret = ret.substr(0,maxLength-3) + "...";
	    }
	    return ret;
	}

	
	$scope.setCategory = function() {
		if (!$scope.filter.category) {
			return false
		}
		$scope.selectedCategory = $scope.filter.category
		if ($scope.filter.category=='News') {
			$scope.selectedCategory = "News and Events"
		}
		get.total()
	}

	// Inline Alert and Feedback
	$scope.inlineFeedback = { type: '', message: '' }	
	$scope.confirmation = { msg: "", question: "", article:"", option: {  yes: { label: "", action: function() {} }, no: { label: "", action: function() {} }  } }
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
	
	$scope.resetConfirmation = function(){
		$scope.confirmation = {}
		$scope.confirmation.msg = "" 
		$scope.confirmation.question = ""
		$scope.confirmation.article = ""
		$scope.confirmation.option = {}
		$scope.confirmation.option.yes = {}
		$scope.confirmation.option.yes.label = ""
		$scope.confirmation.option.action = null
		$scope.confirmation.option.no = {}
		$scope.confirmation.option.no.label = ""
		$scope.confirmation.option.no.action = null						
	}

	$scope.confirmAction = function(action,article){
		$scope.toggleInlineFeedback('reset',null,null,null);

		if (!article) {
			$scope.toggleInlineFeedback('show','error', 'No article found.','index');
			return false
		}

		var yesLabel = "", noLabel = "";
		switch(action) {
			case 'archive':
				yesLabel = 'Archive'
				noLabel = "Don't Archive"
				break;
			case 'unarchive':
				yesLabel = 'Unarchive'
				noLabel = "Don't Unarchive"
				break;
			case 'publish':
				yesLabel = 'Publish'
				noLabel = "Don't Publish"
				break;
			case 'unpublish':
				yesLabel = 'Unpublish'
				noLabel = "Don't Unpublish"
				break;
		}

		// Show Confirmation
		if (article.title) {
			$scope.confirmation.article = 'Title of selected article: '+article.title	
		}
		$scope.confirmation.msg = 'This action will '+action+' this article.'
		$scope.confirmation.question = "Please confirm your action."

		$scope.confirmation.option.yes.label = yesLabel
		$scope.confirmation.option.no.label = noLabel
		
		$scope.confirmation.option.yes.action = function(){
			$scope.doAction(action,article)
		}
		$scope.confirmation.option.no.action = function() {
			$scope.cancelAction()	
		}
	}

	$scope.cancelAction = function(){
		// Hide x Reset Confirmation Message 
		$scope.resetConfirmation()
	}

	$scope.doAction = function(action,article) {
		if (!article) {
			$scope.toggleInlineFeedback('show','error', 'No article found.','index');
			return false
		}
		if (!article.pk) {
			$scope.toggleInlineFeedback('show','error', 'No article id found.','index');
			return false
		}
		var obj = {
			pk : parseInt(article.pk,10),
			action: action,
			updatedBy : $scope.user.name
		}

		$scope.newspromise = CMSFactory.news.doAction(obj)
		$scope.newspromise.then(function(response){
			if (response.data) {
				if (response.data.success===true || response.data.success==='true') {
					$scope.toggleInlineFeedback('show','success',response.data.msg,'index');	
					get.total();
				}
				else {
					$scope.toggleInlineFeedback('show','error',response.data.msg,'index');
				}
				$scope.resetConfirmation()
			}
			delete $scope.newspromise;
		},function(err){
			console.log(err)
			delete $scope.newspromise;
		})
	}
	$scope.sectionCategory = ''
	$scope.$watch('filter.category',function(v){
		$scope.sectionCategory = ''
		if (v) {
			$scope.sectionCategory = v
			if (v=='EITI in other Countries') {
				$scope.sectionCategory = 'EITI-in-other-Countries'
			}
			else if (v=="MSG Member of the Month") {
				$scope.sectionCategory = 'MSG-Member-of-the-Month'
			}
		}
	})
}])
