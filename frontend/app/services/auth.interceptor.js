'use strict';

angular.
    module('userAdminApp').factory('authInterceptorService', ['$q', '$injector', 'authService', function ($q, $injector, authService) {

    var authInterceptorServiceFactory = {};

    authInterceptorServiceFactory.request = function (config) {
        return authService.getToken().then(
            function(token) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Token ' + token;
                return $q(function(resolve, reject) { resolve(config)});
            }
        );
    };

    authInterceptorServiceFactory.responseError = function (response) {
        if (response.status === 401) {
            var $http = $injector.get('$http');
            return authService.getToken(true).then(
                function(token) {
                    response.config.headers = response.config.headers || {};
                    response.config.headers.Authorization = 'Token ' + token;
                    return $http(response.config);
                }
            );
        }
        return $q.reject(response);
    };

    return authInterceptorServiceFactory;
}]);
