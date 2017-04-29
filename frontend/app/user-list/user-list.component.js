'use strict';

angular.
  module('userList').
  component('userList', {
    templateUrl: 'app/user-list/user-list.template.html',
    controller: ['$rootScope', '$mdDialog', 'User', function UserListController($rootScope, $mdDialog, User) {
        var self = this;

        User.query(function(result) {
            self.users = []
            angular.forEach(result.results, function(value, key) {
                self.users.push(new User(value));
            });
        });

        self.showDetails = function(user) {
            user = user || new User({own: true});

            const dialogScope = $rootScope.$new(true);
            /* Copy selected user model to the form scope
            so list item is not updated simulteneously with form
            */
            dialogScope.selected = angular.copy(user);


            dialogScope.onSubmit = function() {
                if (dialogScope.selected.id) {
                    dialogScope.selected.$update(function() {
                        // Copy edited data back to selected user model
                        angular.copy(dialogScope.selected, user);
                        $mdDialog.hide();
                    });
                } else {
                    dialogScope.selected.$save(function() {
                        self.users.push(dialogScope.selected);
                        $mdDialog.hide();
                    });
                }
            };
            dialogScope.onDelete = function() {
                console.log('onDelete');
                dialogScope.selected.$delete(function() {
                    self.users.splice(
                        self.users.indexOf(user), 1);
                });
                $mdDialog.hide();
            };
            dialogScope.onCancel = function() {
                console.log('onCancel');
                $mdDialog.cancel();
            };

            $mdDialog.show({
                template: '<user-details selected=selected on-submit="onSubmit()" on-cancel="onCancel()" on-delete="onDelete()"></user-details>',
                scope: dialogScope,
                clickOutsideToClose:true,
            });
      };
    }],
  });
