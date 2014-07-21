'use strict';

keywordSegmentsControllers.controller('NavCtrl', ['$scope', '$location', 'DataShareService', function ($scope, $location, DataShareService) {
	$scope.selectedDataAccount = {};
	
	$scope.isActive = function(route) {
		return route === $location.path();
	}
	
	$scope.selectedDataAccount = DataShareService.getSelectedDataAccount();
	
}]);