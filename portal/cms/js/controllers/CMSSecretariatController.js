(function(){
	'use strict';

	angular
		.module('cms')
		.filter('formatDate',formatDate)
		.factory('SecretariatDataFactory',SecretariatDataFactory)
		.controller('CMSSecretariatController',CMSSecretariatController);

	function formatDate(){
        return function(input) {
           return moment(input).format('LL')
        };
    } 

    SecretariatDataFactory.$inject = ['$http'];
    function SecretariatDataFactory($http){
    	var __baseURL__ = 'https://api.mlab.com/api/1/databases/pheiti/collections/about-pheiti/';
	    var __APIKEY__ = 'AkQtTxgkxLEYOQz9oFH85K3godWJNhtr';

	    var dataService  = {
	    	get : get,
	        info : null,
	        update : update,
            getAccounts : getAccounts,
            updateAccount : updateAccount,
            resetPassword : resetPassword,
            changePassword : changePassword
	    }

	    return dataService; 

	    ////// 

		function get(){
			return $http({
	            url:__baseURL__+'593caa34734d1d02258f2031?apiKey='+__APIKEY__,
	            method:'GET'
	        });
		}

		function update(content){
			return $http({
	            url:__baseURL__+'593caa34734d1d02258f2031?apiKey='+__APIKEY__,
	            method:'PUT',
	            data: JSON.stringify(content)
	        });
		}

        function getAccounts(){
            return $http({
                url:'../../rest/functions/get-users.php',
                method:'GET'
            });
        }

        function resetPassword(userid){
            return $http({
                url:'../../rest/functions/reset-user-password.php?id='+userid,
                method:'GET'
            });
        }

        function updateAccount(content){
            return $http({
                url:'../../rest/functions/userprofile-update.php',
                method:'PUT',
                data: content
            });
        }

        function changePassword(content){
            return $http({
                url:'../../rest/functions/user-change-pwd.php',
                method:'PUT',
                data: content
            });   
        }
    }

    CMSSecretariatController.$inject = ['$scope','SecretariatDataFactory','$mdDialog','utilsService','$rootScope'];
    function CMSSecretariatController($scope,SecretariatDataFactory,$mdDialog,utilsService,$rootScope){
    	$scope.members = [];
    	$scope.contact = {};
    	$scope.original_document = {};
        $scope.accounts = [];
        $scope.userAccount = {};
        $scope.showMyAccount = false;
        $scope.showPwd = false;

    	function getData(firstLoad){
    		$scope.members = [];
    		$scope.contact = {};    		
            $scope.accounts = [];
            $scope.userAccount = {};

    		$scope.getpromise = SecretariatDataFactory.get();
    		$scope.getpromise.then(function(response){
    			delete $scope.getpromise;
    			if (firstLoad) {
    				$scope.original_document = angular.copy(response.data);
    			}
    			$scope.members = response.data.content;
    			$scope.contact = response.data.contact;

                getAccounts();
    		},function(error){
    			delete $scope.getpromise;
    		})
    	}

    	getData(true);

        function getAccounts(){
            var p = SecretariatDataFactory.getAccounts();
            p.then(function(response){
                $scope.accounts = response.data;

                if ($scope.user.id) {
                    var useridx = utilsService.indexInObj($scope.accounts,'id',$scope.user.id);
                    if (useridx!==null) {
                        $scope.userAccount = angular.copy($scope.accounts[useridx]);    
                        $scope.userAccount.newpassword = "";
                        $scope.userAccount.retype = "";
                        $scope.userAccount.original = angular.copy($scope.userAccount);
                    }
                }
                
            },function(err){

            });
        }

    	$scope.save=function(event){
    		var contentDoc = angular.copy($scope.original_document);
    		contentDoc.content = angular.copy($scope.members);
    		contentDoc.contact = angular.copy($scope.contact);

    		$scope.getpromise = SecretariatDataFactory.update(contentDoc);
    		$scope.getpromise.then(function(response){
    			delete $scope.getpromise;
    			$scope.original_document = angular.copy(response.data);
    			$scope.members = response.data.content;
    			$scope.contact = response.data.contact;
    			$scope.showAlert(event,'Changes saved.');
    		},function(error){
    			delete $scope.getpromise;
    		});

    	}

		$scope.showAlert = function(ev,msg) {
			// Appending dialog to document.body to cover sidenav in docs app
			// Modal dialogs should fully cover application
			// to prevent interaction outside of dialog
			$mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.querySelector('#cms-content-placeholder')))
					.clickOutsideToClose(true)
					.title('Secretariat Info')
					.textContent(msg)
					.ariaLabel()
					.ok('Ok')
					.targetEvent(ev)
			).then(function(){
                if (msg==='New password saved.') {
                    window.location.href = '../../portal/login';
                }
            },function(){
                if (msg==='New password saved.') {
                    window.location.href = '../../portal/login';
                }
            });
		};


        $scope.resetPassword=function(evt,mem,idx){
            var id = utilsService.getObjOtherPropVal($scope.accounts,'name',mem.name,'id');
            var email = utilsService.getObjOtherPropVal($scope.accounts,'name',mem.name,'email');

            $scope.getpromise = SecretariatDataFactory.resetPassword(id);
            $scope.getpromise.then(function(response){
                delete $scope.getpromise;
                $scope.showAlert(event,'Password reset successful.');
            },function(error){
                delete $scope.getpromise;
            });
        }

        $scope.updatePassword=function(ev){
            if ($scope.changePwdForm.$invalid) {
                $scope.showAlert(event,'Please check the required fields.');
                return false;
            }

            if ($scope.userAccount.password.trim()===$scope.userAccount.newpassword.trim()) {
                $scope.showAlert(event,'New password should not be the same as the current password.');
                return false;   
            }

            if ($scope.userAccount.newpassword.trim()!==$scope.userAccount.retype.trim()) {
                $scope.showAlert(event,'New password and re-type password do not match. Pleas check.');
                return false;   
            }

            var userInfo = {
                id : $scope.userAccount.id,
                newpassword: $scope.userAccount.newpassword
            }

            $scope.getpromise = SecretariatDataFactory.changePassword(userInfo);
            $scope.getpromise.then(function(response){
                delete $scope.getpromise;
                getData(true);
                $scope.showAlert(event,'New password saved.');
                // window.location.href = '../../portal/login';
            },function(error){
                delete $scope.getpromise;
            });

        }

        $scope.updateAccount=function(){
            if ($scope.accountForm.$invalid) {
                $scope.showAlert(event,'Please check the required fields.');
                return false;
            }

            var updateDoc = false;
            if ($scope.accountForm['acct-name'].$dirty == true || $scope.accountForm['acct-name'].$touched == true) {
                updateDoc = true;
            }
            if ($scope.accountForm['acct-position'].$dirty == true || $scope.accountForm['acct-position'].$touched == true) {
                updateDoc = true;
            }     

            if (updateDoc===true) {
                var memberIdx = utilsService.indexInObj($scope.members,'name',$scope.userAccount.original.name);
                if (memberIdx!==null) {
                    $scope.members[memberIdx].name = $scope.userAccount.name;
                    $scope.members[memberIdx].position = $scope.userAccount.position;
                }

                // Back-end call to update here
                var contentDoc = angular.copy($scope.original_document);
                contentDoc.content = angular.copy($scope.members);
                $scope.getpromise = SecretariatDataFactory.update(contentDoc);
                $scope.getpromise.then(function(response){
                    delete $scope.getpromise;
                    $scope.original_document = angular.copy(response.data);
                    $scope.members = response.data.content;
                    $scope.contact = response.data.contact;
                    $scope.showAlert(event,'Changes saved.');
                },function(error){
                    delete $scope.getpromise;
                });

            }
            else {
                var updatedInfo = {
                    id : $scope.userAccount.id,
                    name: $scope.userAccount.name,
                    position: $scope.userAccount.position,
                    email:  $scope.userAccount.email
                }

                $scope.getpromise = SecretariatDataFactory.updateAccount(updatedInfo);
                $scope.getpromise.then(function(response){
                    delete $scope.getpromise;
                    getData(true);
                    $scope.showAlert(event,'Changes saved.');
                },function(error){
                    delete $scope.getpromise;
                });
            }

        }
    }

})();