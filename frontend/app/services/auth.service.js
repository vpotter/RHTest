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

        auth2.isSignedIn.listen(this.signinChanged);
        auth2.currentUser.listen(this.userChanged);
    };

    authServiceFactory.getToken = function(refresh) {
        refresh = refresh || false;

        if ($rootScope.current_user && !refresh) {
            var auth_response = $rootScope.current_user.getAuthResponse();
            var current_timestamp = new Date().getTime();
            if (auth_response.expires_at > current_timestamp) {
                return $q.when(auth_response.id_token);
            } else {
                return $q.when($rootScope.current_user.reloadAuthResponse())
                        .then(function() {
                            return $rootScope.current_user.getAuthResponse().id_token;
                        });
            }
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
        return $q.when(_auth2.signOut());
    };

    authServiceFactory.userChanged = function(user){
        $rootScope.current_user = user;
    };

    authServiceFactory.signinChanged = function(isSignedIn) {
        console.log(isSignedIn);
    };

    return authServiceFactory;
}]);