'use strict';

angular
    .module('userAdminApp', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngResource', 'userList', 'userDetails', 'exceptionHandler'])
    .controller('userAdminController', ['$rootScope', 'authService', function($rootScope, authService){
        var self = this;

        authService.init();

        self.signOut = function() {
            console.log('sign out');
            if ($rootScope.current_user) {
                authService.signOut();
            }
            window.location = '/';
        };
    }]);
