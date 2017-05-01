'use strict';

angular.module('userAdminApp').
    factory('User', ['$resource', function($resource) {
        return $resource(BACKEND_URL + '/api/users/:id', {'id': '@id'} ,{
            update: {method: 'PUT'}
        });
    }]);