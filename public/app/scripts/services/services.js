'use strict';

var keywordSegmentsServices = angular.module('keywordSegmentsServices', ['ngResource']);

keywordSegmentsServices.service('DataShareService', ['$http', '$q', '$resource', function ($http, $q, $resource) {
    
	var actualData, stopWordList, negativeKeywordList;
	
    /*
	var resActualData = $resource('scripts/Dish Tv Sample.json', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
	
	var resStopWord = $resource('scripts/StopWords_Step1.txt', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
	
	var resNegativeKeyword = $resource('scripts/NegativeKeywords_Step2.txt', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
    */

    var resActualData = $resource('api/keywords', {}, {
      query: { method:'GET', params:{}, isArray:true }
    });

	var resStopWord = $resource('api/stopwords', {}, {
      query: { method:'GET', params:{}, isArray:true }
    });
	
	var resNegativeKeyword = $resource('api/negativekeywords', {}, {
      query: { method:'GET', params:{}, isArray:true }
    });

	return {
		// Actual Data
		fetchActualData: function(callback) {
			if (typeof actualData == 'undefined') {
				resActualData.query(function(data) { 
					actualData = data;
					// ugly hack but no time
					actualData.forEach(function(elem, ind) {
						elem.userInputSegmentArray = [];
						elem.userInputSegment = '';
                        //console.log(elem);
					});
					callback(actualData);
				});
			}
			else {
				callback(actualData);
			}
		},
		
		updateActualData: function(data) {
			actualData = data;
		},
		
		// Stop wprds List Data
		fetchStopWordList: function(callback) {
			if (typeof stopWordList == 'undefined') {
				resStopWord.query(function(data) { 
					stopWordList = data;
                    //console.log(data);
					// ugly hack but no time
					stopWordList = stopWordList.map(function(elem, ind) {
						return elem.stopword.trim();
					});
					callback(stopWordList);
				});
			}
			else {
				callback(stopWordList);
			}
		},
		
		updateStopWordList: function(data) {
			stopWordList = data;
            console.log(stopWordList);
		},
			
		// Stop Negative Keyword List Data
		fetchNegativeKeywordList: function(callback) {
			if (typeof negativeKeywordList == 'undefined') {
				resNegativeKeyword.query(function(data) { 
					negativeKeywordList = data;
					// ugly hack but no time
					negativeKeywordList = negativeKeywordList.map(function(elem, ind) {
						//console.log(elem.negativekeyword);
						return elem.negativekeyword.trim();
					});
					callback(negativeKeywordList);
				});
			}
			else {
				callback(negativeKeywordList);
			}
		},
		
		updateNegativeKeywordList: function(data) {
			negativeKeywordList = data;
		}
		
		};
		
}]);
