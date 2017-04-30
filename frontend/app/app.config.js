'use strict';

angular
    .module('userAdminApp')
    .config(['$httpProvider',
        function config($httpProvider) {
            $httpProvider.interceptors.push('authInterceptorService');
        }
    ])
    .config(['$qProvider',
        function config($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }])
    ;
