'use strict';

angular.
    module('userAdminApp').factory('authInterceptorService',
        ['$q', '$injector', '$exceptionHandler', 'authService',
        function ($q, $injector, $exceptionHandler, authService) {

    var authInterceptorServiceFactory = {};

    authInterceptorServiceFactory.request = function (config) {
        var promise_chain = $q.when('');
        var result = promise_chain
            .then(
                function(){
                    return authService.getToken(config.retry);
                })
            .then(
                function(token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Token ' + token;
                    return config;
                })
            .catch(function(error) {
                return $exceptionHandler({
                    name: '401 Unauthorized Error',
                    message: "Sorry, you don't have access to the application"}, null, true);
            });
        return result;
    };

    authInterceptorServiceFactory.responseError = function (response) {
        if (response.status === 401 && !response.config.retry) {
            var $http = $injector.get('$http');
            response.config.retry = true;
            return $http(response.config);
        }
        switch(response.status) {
            case 401:
                $exceptionHandler({
                    name: "401 Unauthorized Error",
                    message: "Sorry, you don't have access to the application"}, null, true);
                break;
            case 403:
                $exceptionHandler({
                    name: "401 Forbidden Error",
                    message: "Access denied"});
                break;
            case 500:
                $exceptionHandler({
                    name: "500 Server Error",
                    message: "Unexpected error occurred"});
                break;
            case -1:
                $exceptionHandler({
                    name: "Server unavailable",
                    message: "Server unavailable. Please try again later"},
                    null, true);

        }

        return $q.reject(response);
    };

    return authInterceptorServiceFactory;
}]);
