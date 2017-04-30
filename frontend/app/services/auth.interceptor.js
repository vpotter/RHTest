'use strict';

angular.
    module('userAdminApp').factory('authInterceptorService',
        ['$q', '$injector', '$exceptionHandler', 'authService',
        function ($q, $injector, $exceptionHandler, authService) {

    var authInterceptorServiceFactory = {};

    authInterceptorServiceFactory.request = function (config) {
        var promise_chain = $q.when('');

        if (config.retry) {
            var $mdDialog = $injector.get('$mdDialog');
            promise_chain = promise_chain
                .then(function() {
                    return $mdDialog
                        .show($mdDialog.confirm({
                            textContent: "You don't have access to the application. Please try to re-login using different account",
                            ok: 'Close'
                    }));
                });
        }
        var result = promise_chain
                        .then(
                            function(){
                                return authService.getToken(config.retry)
                            })
                        .catch(function(error) {
                            $exceptionHandler({
                                name: '401 Unauthorized Error',
                                message: "Sorry, you don't have access to the application"}, null, true);
                        })
                        .then(
                            function(token) {
                                config.headers = config.headers || {};
                                config.headers.Authorization = 'Token ' + token;
                                return config;
                            }
                        );
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
