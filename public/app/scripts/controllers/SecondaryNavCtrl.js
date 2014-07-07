'use strict';
/*
keywordSegmentsControllers.controller('SecondaryNavCtrl', ['$scope', '$location', function ($scope, $location) {

	$scope.isActive = function(route) {
		return route === $location.path();
	}

}]);

keywordSegmentsControllers.controller('MainNavCtrl', ['$scope', '$location', function ($scope, $location) {

	$scope.isActive = function(route) {
		return route === $location.path();
	}

}]);
*/
keywordSegmentsControllers.controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {

	$scope.isActive = function(route) {
		return route === $location.path();
	}

}]);