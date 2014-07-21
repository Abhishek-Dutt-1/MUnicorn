'use strict';

var keywordSegmentsFilters = angular.module('keywordSegmentsFilters', []);

keywordSegmentsFilters.filter('checkmark', function () {

	return function(input) {
		return (input == 'TRUE') ? '\u2713' : '-';  //'\u2718';
	};
	
});