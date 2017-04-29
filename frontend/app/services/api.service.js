'use strict';

angular.module('userAdminApp').
    factory('User', ['$resource', function($resource) {
        return $resource(BACKEND_URL + '/api/users/:id', {'id': '@id'} ,{
            query: {method: 'GET', isArray: false},
            update: {method: 'PUT'}
        });
    }]);