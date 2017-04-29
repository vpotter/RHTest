'use strict';

angular.
    module('userAdminApp').factory('authService', ['$q', function($q) {
    var auth2, googleUser = {};
    var _clientId = '';
    var authServiceFactory = {};

    function error(reason) {
        console.log('error!', reason);
    }

    authServiceFactory.init = function(clientId) {
        var deferred = $q.defer();

        if (typeof auth2 === 'undefined') {
            gapi.load('auth2', function() {
                authServiceFactory._initAuth();
                deferred.resolve(gapi.auth2);
            });
        }

        this.promise = deferred.promise;
        return this.promise;
    };

    authServiceFactory._initAuth = function(_auth2) {
        auth2 = gapi.auth2.init({
            client_id: GOOGLE_CLIENT_ID,
            cookiepolicy: 'single_host_origin',
        });

        auth2.isSignedIn.listen(this.signinChanged);
        auth2.currentUser.listen(this.userChanged);
    };

    authServiceFactory.getToken = function(refresh) {
        refresh = refresh || false;
        var authToken = localStorage.getItem("authToken");

        if (authToken && !refresh) {
            return $q(function(resolve, reject) {
                resolve(authToken);
            });
        }
        return this.init().then(this.signIn).then(
            function(response){
                var token_id = googleUser.getAuthResponse().id_token;
                localStorage.setItem("authToken", token_id);
                return token_id;
            }, error
        );
    };

    authServiceFactory.signIn = function() {
        return auth2.signIn().then(function(){});
    };

    authServiceFactory.userChanged = function(user){
        googleUser = user;
    };

    authServiceFactory.signinChanged = function(isSignedIn) {
        if (!isSignedIn) {
            localStorage.removeItem("authToken");
        }
    };

    return authServiceFactory;
}]);