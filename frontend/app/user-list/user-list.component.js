'use strict';

angular.
  module('userList').
  component('userList', {
    templateUrl: 'app/user-list/user-list.template.html',
    controller: ['$http', function UserListController($http) {
        var self = this;

        $http.get(BACKEND_URL + '/api/users/').then(function(response) {
            self.users = response.data.results;
        });
    }],
    bindings: {
        showDetails : '&onSelected',
    }
  });
