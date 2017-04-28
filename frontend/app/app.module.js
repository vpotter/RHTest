'use strict';

var app = angular.
    module('userAdminApp', ['ngMaterial', 'ngRoute', 'userList', 'userDetails']).
    controller('AppController', function AppController($mdDialog, $rootScope){
        var self = this;

        self.selected = null;
        self.users = [];

        // self.selectUser = function(user) {
        //     console.log(user);
        //     self.selected = user;
        // };
        self.selectUser = function(user) {

            const tempScope = $rootScope.$new(true);
            tempScope.selected = angular.copy(user);
            $mdDialog.show({
                template: '<user-details selected=selected></user-details>',
                // scope: {selected: user}
                scope: tempScope,
                // bindToController: true,
                // controller: 'userDetails'
                // parent: angular.element(document.body),
                // targetEvent: u,
                clickOutsideToClose:true,
                // fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                console.log('success');
                user = angular.copy(tempScope.selected);
                tempScope.status = 'You said the information was "' + answer + '".';
            }, function() {
                console.log('failure');
                user = angular.copy(tempScope.selected);
                user.first_name = tempScope.selected.first_name;
                console.log(user, tempScope.selected);
                tempScope.status = 'You cancelled the dialog.';
            });
      };
    });