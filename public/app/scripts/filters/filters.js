'use strict';

var keywordSegmentsFilters = angular.module('keywordSegmentsFilters', []);

keywordSegmentsFilters.filter('checkmark', function () {

	return function(input) {
		return (input == true) ? '\u2713' : '-';  //'\u2718';
	};
	
});

// Used in paginating Keywords Table
keywordSegmentsFilters.filter('startFrom', function () {

	return function(input, start) {
        start = +start;         // Parse to int
		return (input) ? input.slice(start): null;
	}
	
});
