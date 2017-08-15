(function(){
	'use strict';

	angular.module('inputfileupload',[]);

	angular
		.module('inputfileupload')
		.directive('inputfile',inputfile);


	inputfile.$inject = ['$parse','$rootScope'];
	function inputfile($parse,$rootScope){
		var directive = {
			restrict : 'A',
			controller: inputfileCtrl,
			link: inputfileLink
		}

		return directive;

		//////// 

		function inputfileCtrl($scope,$element,$rootScope){
			$scope.init = function(){
				alert('init check file')
			}
			$scope.noFileTrigger = function(){
				alert('no file')
			}
			$scope.minSizeTrigger = function(){
				alert('min size triggered')
			}
			$scope.dimensionTrigger = function(){
				alert('dimension check')
			}
		}

		function inputfileLink(scope,element,attrs,ngModel){
			var model = $parse(attrs.inputfile);
			var modelSetter = model.assign;	
			var form = document.getElementById(attrs.formName);

			element.bind('change',function(evt){
				var id = evt.target.id.split('-')[1];
				if (element[0]) {
					if (element[0].files) {
						var currfile = element[0].files;
						var f = currfile[0];

						if (f) {
							if (f.size===0) {
								scope.minSizeTrigger(id,f);
								return false;
							}
						}

						var reader = new FileReader();
						reader.onloadend = function(){
							if (reader.result) {
								var fileResultArr = reader.result.split('base64','');
								scope.$apply(function(){
									element[0].files[0].fileStream = fileResultArr[1];
									modelSetter(scope,element[0].files[0]);
									scope.init(id,element[0].files[0]);
								});
							}
						}

						if (element[0].files[0]) {
							if (!element[0].files[0].fileStream) {
								reader.readAsDataURL(element[0].files[0]);
							}
						}

						if (element[0].files.length===0) {
							scope.noFileTrigger(id);
							return false;
						}

						if (element[0].files.length > 5) {
							alert('Found '+element[0].files.length);
							return false;
						}
					}
				}

			});
		}

	}
})();