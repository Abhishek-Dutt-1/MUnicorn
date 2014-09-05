'use strict';

keywordSegmentsControllers.controller('UserProfileCtrl', ['$scope', '$location', '$routeParams', 'DataShareService', function ($scope, $location, $routeParams, DataShareService) {

	$scope.params =  $routeParams;
	$scope.user = DataShareService.User.get({id: $scope.params.userId});
}]);