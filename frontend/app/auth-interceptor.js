'use strict';
app.factory('authInterceptorService', ['$q', '$location', function ($q, $location, localStorageService) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authToken = localStorage.getItem("authToken");
        if (authToken) {
            config.headers.Authorization = 'Token ' + authToken;
        }

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            // display login modal dialog here
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);
