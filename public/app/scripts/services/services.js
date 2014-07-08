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
		
		////////////////////////////////// Stop wprds List Data
        fetchStopWordList: function(callback) {
            resStopWord.query(function(data) { 
                stopWordList = data;
                // ugly hack but no time
//                stopWordList = stopWordList.map(function(elem, ind) {
//                    return elem.stopword.trim();
//                });
                callback(stopWordList);
            });
		},
   
        /*
		fetchStopWordList: function(callback) {
			if (typeof stopWordList == 'undefined') {
				resStopWord.query(function(data) { 
					stopWordList = data;
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
        */
		
		updateStopWordList: function(data) {
			stopWordList = data;
		},

        saveNewStopword: function(data, callback) {
            $resource('api/stopwords', {} , {
                query: { method:'POST', params:{stopword: data}, isArray:false }
            }).query( function(res) { callback(res); } );
            //temp.query( function(res) { callback(res); } );
        },
			
        destroyStopWord: function(id, callback) {
            $resource('api/stopwords/' + id, {} , {
                query: { method:'DELETE', params:{}, isArray:false }
            }).query( function(res) { callback(res); } );
        },


		////////////////////////////// Negative Keyword List Data
		fetchNegativeKeywordList: function(callback) {
            resNegativeKeyword.query(function(data) { 
                negativeKeywordList = data;
                console.log(data);
                // ugly hack but no time
//					negativeKeywordList = negativeKeywordList.map(function(elem, ind) {
                    //console.log(elem.negativekeyword);
//						return elem.negativekeyword.trim();
//					});
                callback(negativeKeywordList);
            });
        },
        /*
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
        */
		updateNegativeKeywordList: function(data) {
			negativeKeywordList = data;
		},

        saveNewNegativeKeyword: function(data, callback) {
            $resource('api/negativekeywords', {} , {
                query: { method:'POST', params:{Negativekeyword: data}, isArray:false }
            }).query( function(res) { callback(res); } );
            //temp.query( function(res) { callback(res); } );
        },
			
        destroyNegativeKeyword: function(id, callback) {
            $resource('api/negativekeywords/' + id, {} , {
                query: { method:'DELETE', params:{}, isArray:false }
            }).query( function(res) { callback(res); console.log(res); } );
        },


        ////////////////////////////////////// get keywords for the keywords table
        fetchKeywords: function(pageNum, keywordsPerPage, callback) {

            var resKeywords = $resource('api/keywords/' + pageNum + '/' + keywordsPerPage , {} , {
                query: { method:'GET', params:{}, isArray:true }
            });

            resKeywords.query( function(data) { callback(data); } );

        },

        //////////////////  OPS
        deleteMatchingStopWordsFromKeywords: function(callback) {
             $resource('api/deletestopwordsfromkeywords/', {} , {
                query: { method:'DELETE', params:{}, isArray:false }
            }).query( function(res) { callback(res); } );
        }

		
    };  // end return
		
}]);
