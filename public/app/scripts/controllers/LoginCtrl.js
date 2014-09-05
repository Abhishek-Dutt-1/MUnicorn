'use strict';

keywordSegmentsControllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'DataShareService', 'AuthService', 'AUTH_EVENTS', function ($rootScope, $scope, $location, DataShareService, AuthService, AUTH_EVENTS) {

    $scope.loginSubmitted = false;
    $scope.registerSubmitted = false;
    $scope.registerError = {};
	$scope.errorArray = [];

    $scope.submitLoginForm = function(isValid) {
        $scope.loginSubmitted = true;
        if(isValid) {
            var credentials = { email: $scope.email, password: $scope.password };
            AuthService.loginUser( credentials,
                function(user) { 
                    console.log(user);
                    $location.path('/user/' + user.id);
                    //$rootScope.$broadcast( AUTH_EVENTS.loginSuccess );
                    // handel remember me
                },
                function(err) {
                    console.log(err);
                    $scope.errorArray = [];
                    $scope.errorArray.push( {status: err.status, message: err.data} );
                    //$rootScope.$broadcast( AUTH_EVENTS.loginFailed );
                });
        }
    };

    $scope.submitRegisterForm = function(isValid) {
        $scope.registerSubmitted = true;
        console.log($scope.registerForm);
        if(isValid)
        {
            var formData = {email: $scope.registerEmail, password: $scope.registerPassword, password_confirmation: $scope.registerPassword2};
            var newUser = new DataShareService.User();

            newUser.$save( 
                formData, 
                function(res)
                { 
                    console.log(res); 
                    $scope.registerError = {}; 
                }, 
                function(err) 
                {
                    $scope.registerError = err; 
                    console.log(err); 
                } 
            );

            console.log(newUser);
        }
    };

}]);
