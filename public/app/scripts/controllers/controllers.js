'use strict';

//var keywordSegmentsControllers = angular.module('keywordSegmentsControllers', ['keywordSegmentsServices', 'angularFileUpload', 'keywordSegmentsFilters', 'keywordSegmentsDirectives', 'ui.bootstrap' ]);
var keywordSegmentsControllers = angular.module('keywordSegmentsControllers', ['keywordSegmentsServices', 'angularFileUpload', 'keywordSegmentsFilters', 'mgcrea.ngStrap', 'ngAnimate']);

keywordSegmentsControllers.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
        ];
    }]);
