'use strict';

var keywordSegmentsControllers = angular.module('keywordSegmentsControllers', ['keywordSegmentsServices']);

keywordSegmentsControllers.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
        ];
    }]);
