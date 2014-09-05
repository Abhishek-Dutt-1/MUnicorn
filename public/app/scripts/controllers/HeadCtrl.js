'use strict';

keywordSegmentsControllers.controller('headCtrl', ['$scope', '$location', '$rootScope', 'DataShareService', function ($scope, $location, $rootScope, DataShareService) {
	//$scope.selectedDataAccount = {};
	/*
	$scope.isActive = function(route) {
		return route === $location.path();
	};
	*/
	$scope.themeName = 'light_theme';
	//$scope.themeName = DataShareService.themeName;
	
	$rootScope.$on('themeChange', function(event, data) {
		$scope.themeName = data;
	});

	/*
	$scope.switchTheme = function(theme) {
		console.log(theme);
	};
	*/
	
	
	//$scope.selectedDataAccount = DataShareService.getSelectedDataAccount();
	
}]);