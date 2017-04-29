'use strict';

var app = angular.
    module('userAdminApp', ['ngMaterial', 'ngRoute', 'userList', 'userDetails']).
    controller('AppController', ['$mdDialog', '$rootScope', 'authService', function AppController($mdDialog, $rootScope, authService){
        var self = this;

        self.selectUser = function(user) {

            const dialogScope = $rootScope.$new(true);
            dialogScope.selected = angular.copy(user);

            dialogScope.onSubmit = function() {
                // TODO: send a user to backend;
                $mdDialog.hide();
            };
            dialogScope.onCancel = function() {
                console.log('onCancel');
                $mdDialog.cancel();
            };

            $mdDialog.show({
                template: '<user-details selected=selected on-submit="onSubmit()" on-cancel="onCancel()""></user-details>',
                scope: dialogScope,
                clickOutsideToClose:true,
            })
            .then(function() {
                console.log('success', dialogScope.selected);
                angular.copy(dialogScope.selected, user);
            }, function() {
                console.log('canceled');
            });
      };
    }]);
