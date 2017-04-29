'use strict';

angular.
  module('userList').
  component('userList', {
    templateUrl: 'app/user-list/user-list.template.html',
    controller: ['$rootScope', '$mdDialog', 'User', function UserListController($rootScope, $mdDialog, User) {
        var self = this;
        User.query(function(result) {self.users = result.results});

        self.showDetails = function(user) {
            user = user || {own: true}

            const dialogScope = $rootScope.$new(true);
            dialogScope.selected = angular.copy(user);


            dialogScope.onSubmit = function() {
                var user_resource = new User();
                user_resource.first_name = dialogScope.selected.first_name;
                user_resource.last_name = dialogScope.selected.last_name;
                user_resource.iban = dialogScope.selected.iban;
                if (user.id) {
                    user_resource.$update({id: user.id}, function() {
                        $mdDialog.hide();
                    });
                } else {
                    user_resource.$save(function() {
                        dialogScope.selected.id = user_resource.id;
                        self.users.push(dialogScope.selected);
                        $mdDialog.hide();
                    });
                }
            };
            dialogScope.onDelete = function() {
                console.log('onDelete');
                var user_resource = new User();
                user_resource.$delete({id: user.id}, function() {
                    self.users.splice(self.users.indexOf(user), 1);
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
            })
            .then(function() {
                console.log('success', dialogScope.selected);
                angular.copy(dialogScope.selected, user);
            }, function() {
                console.log('canceled');
            });
      };
    }],
  });
