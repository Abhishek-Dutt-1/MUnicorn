'use strict';

//var keywordSegmentsControllers = angular.module('keywordSegmentsControllers', ['keywordSegmentsServices', 'angularFileUpload', 'keywordSegmentsFilters', 'keywordSegmentsDirectives', 'ui.bootstrap' ]);
var keywordSegmentsControllers = angular.module('keywordSegmentsControllers', ['keywordSegmentsServices', 'angularFileUpload', 'keywordSegmentsFilters', 'ngAnimate', 'ngProgress']);

keywordSegmentsControllers.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
        ];
    }]);
