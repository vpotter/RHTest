angular.module('userAdminApp').
    factory('User', ['$resource', function($resource) {
        return $resource(BACKEND_URL + '/api/users/:id', {} ,{
            query: {method: 'GET', isArray: false},
            update: {method: 'PUT'}
        });
    }]);