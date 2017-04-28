'use strict';

angular.
    module('userAdminApp').
    config(['$httpProvider',
        function config($httpProvider) {
            $httpProvider.interceptors.push('authInterceptorService');
        }
    ]);