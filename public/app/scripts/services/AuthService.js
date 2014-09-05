'use strict';

keywordSegmentsServices.service('AuthService', ['$rootScope', '$resource', 'AUTH_EVENTS', function ($rootScope, $resource, AUTH_EVENTS) {

    var loggedInUser = {};

    var ops = $resource('api/ops', {},
        {
            loginUser: { method: 'POST', url: 'api/ops/loginuser', params: {email: '@email', password: '@password'}, isArray: false }
        });

    return {

        loginUser: function(credentials, success, error) {
            ops.loginUser(credentials, 
                function(res) {
                    loggedInUser = res;
                    $rootScope.$emit( AUTH_EVENTS.loginSuccess, loggedInUser );
                    success(res);
                }, 
                function(err) {
                    error(err);
                    $rootScope.$emit( AUTH_EVENTS.loginFailed );
                }
            ); 
        },

        getLoggedInUser: function() {
            return loggedInUser;
        },
        
        isAuthorized: function(authorizedRoles) {
            if(!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1)
        },

    }       // end return

}]);

/*
keywordSegmentsServices.service('Session', [function () {
    
    this.create = function(sessionId, userId, userRole) {
        this.id = sessionId;
        this.userId = uesrId;
        this.userRole = userRole;
    };

    this.destroy = function() {
        this.id = null;
        this.userId = null;
        this.userRole = null;
    };

    return this;

}]);
*/
