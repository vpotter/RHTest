'use strict';

angular.
    module('userAdminApp').factory('authService', ['$q', '$rootScope', function($q, $rootScope) {
    var auth2;
    var _clientId = '';
    var authServiceFactory = {};

    function error(reason) {
        console.log('error!', reason);
    }

    authServiceFactory.init = function(clientId) {
        if (!this.promise) {
            var deferred = $q.defer();

            if (typeof auth2 === 'undefined') {
                gapi.load('auth2', function() {
                    authServiceFactory._initAuth();
                    deferred.resolve(gapi.auth2);
                });
            }

            this.promise = deferred.promise;
        }
        return this.promise;
    };

    authServiceFactory._initAuth = function() {
        auth2 = gapi.auth2.init({
            client_id: GOOGLE_CLIENT_ID,
            cookiepolicy: 'single_host_origin',
        });

        auth2.currentUser.listen(this.userChanged);
    };

    authServiceFactory.getToken = function(refresh) {
        refresh = refresh || false;

        var authToken = localStorage.getItem("authToken");

        if (authToken && !refresh) {
            return $q.when(authToken);
        }

        var promise_chain = this.init();
        if (refresh) {
            promise_chain = promise_chain.then(this.signOut);
        }
        var result = promise_chain.then(this.signIn);
        return result;
    };

    authServiceFactory.signIn = function() {
        return $q.when(auth2.signIn({'prompt': 'select_account'}).then(function(){}))
                .then(function(response){
                    return $q(function(resolve, reject) {
                            resolve($rootScope.current_user.getAuthResponse().id_token);
                           });
                });
        };

    authServiceFactory.signOut = function() {
        var _auth2 = gapi.auth2.getAuthInstance();
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUserEmail');
        return $q.when(_auth2.signOut());
    };

    authServiceFactory.userChanged = function(user){
        if (user.isSignedIn()) {
            $rootScope.current_user = user;

            var current_user_email = $rootScope.current_user.getBasicProfile().getEmail();
            $rootScope.current_user_email = current_user_email;
            localStorage.setItem('authToken', $rootScope.current_user.getAuthResponse().id_token);
            localStorage.setItem('currentUserEmail', current_user_email);
        }
    };

    return authServiceFactory;
}]);