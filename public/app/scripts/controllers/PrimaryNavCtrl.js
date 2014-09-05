'use strict';

keywordSegmentsControllers.controller('primaryNavCtrl', ['$rootScope', '$scope', '$location', 'DataShareService', 'AUTH_EVENTS', function ($rootScope, $scope, $location, DataShareService, AUTH_EVENTS) {
	//$scope.selectedDataAccount = {};
	$scope.navbarClass = "navbar-default";
	
	$scope.isActive = function(route) {
		return route === $location.path();
	}
	
	$scope.switchTheme = function(themeName) {
		switch(themeName) {
			case "light_theme": $scope.navbarClass = "navbar-default"; break;
			case "dark_theme": $scope.navbarClass = "navbar-inverse"; break;
			default: $scope.navbarClass = "navbar-inverse"; break;
		}
		DataShareService.setTheme(themeName);
	};
	
	// User logged in
	$rootScope.$on( AUTH_EVENTS.loginSuccess, function(event, data) {
		$scope.loggedInUser = data;
	});
	
	//$scope.selectedDataAccount = DataShareService.getSelectedDataAccount();
	
}]);