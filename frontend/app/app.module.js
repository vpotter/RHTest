'use strict';

angular
    .module('userAdminApp', ['ngMaterial', 'ngMessages', 'ngRoute', 'ngResource', 'userList', 'userDetails', 'exceptionHandler'])
    .controller('userAdminController', ['$rootScope', 'authService', function($rootScope, authService){
        var self = this;

        authService.init();
        $rootScope.current_user_email = localStorage.getItem("currentUserEmail");

        self.signOut = function() {
            console.log('sign out');
            if ($rootScope.current_user) {
                authService.signOut();
            }
            window.location = '/';
        };
    }]);
