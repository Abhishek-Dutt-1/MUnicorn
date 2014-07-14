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
        ////////////////////////////////////// get keywords for the keywords table
        fetchKeywords: function(pageNum, keywordsPerPage, callback) {

            var resKeywords = $resource('api/keywords/' + pageNum + '/' + keywordsPerPage , {} , {
                query: { method:'GET', params:{}, isArray:true }
            });

            resKeywords.query( function(data) { 
                data.forEach( function(elem, index) {
					// ugly hack but no time
                    elem.KeywordStopWordHighlighted = elem.keyword;
                    elem.userInputSegmentArray = [];
                    elem.userInputSegment = '';
                });
                callback(data);
            });

        },

/*
        // Sync delete checkbox state with databse
        toggleDeleteFlag: function(id, state, callback) {
            $resource('api/keywords/toggledeleteflag', {} , {
                query: { method:'POST', params:{id: id, state: state}, isArray:false }
            }).query( function(res) { callback(res); } );
        },
*/
/*
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
*/		
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



        //////////////////  OPS
        // Delete stopwords which match stopwords within keywords
        deleteMatchingStopWordsFromKeywords: function(doNotDelete, callback) {
             $resource('api/ops/deletestopwordsfromkeywords', {} , {
                 query: { method:'POST', params:{ doNotDelete: doNotDelete }, isArray:false }
            }).query( function(res) { callback(res); } );
        },
        // delete matching negative keywords
        deleteMatchingNegativewordsFromKeywords: function(doNotDelete, callback) {
             $resource('api/ops/deletematchingnegativewordsfromkeywords', {} , {
                 query: { method:'POST', params:{ doNotDelete: doNotDelete }, isArray:false }
            }).query( function(res) { callback(res); } );
        },
        // delete order independent duplicates
        deleteDuplicatesFromKeywords: function(doNotDelete, callback) {
             $resource('api/ops/deleteduplicatesfromkeywords', {} , {
                 query: { method:'POST', params:{ doNotDelete: doNotDelete }, isArray:false }
            }).query( function(res) { callback(res); } );
        },

        /// Fetch subset of 2 word and 1 word phrases data
        fetchPhrases: function(pageNum, keywordsPerPage, callback) {
            var resPhrases = $resource('api/ops/phrases/' + pageNum + '/' + keywordsPerPage , {} , {
                query: { method:'GET', params:{}, isArray:true }
            });
            // post processing
            resPhrases.query( function(data) { 
                callback(data);
            });
        },

        /// Fetch ALL 2 word and 1 word phrases data
        fetchAllPhrases: function(phraselength, callback) {
            var resPhrases = $resource('api/ops/getallphrases/' + phraselength, {} , {
                query: { method:'GET', params:{}, isArray:true }
            });
            // post processing
            resPhrases.query( function(data) { 
                callback(data);
            });
        },

        /// Refresh segmentmap table with 1 and 2 words phrases by recalulating
        //counts
        refreshPhrases: function(callback) {
            var resPhrases = $resource('api/ops/refreshphrases', {} , {
                query: { method:'GET', params:{}, isArray:false }
            });
            // post processing
            resPhrases.query( function(res) { 
                callback(res);
            });
        },

        // Save user inputted segments to segments map table
        saveInputSegments: function(segmentMap, callback) {
           
            $http({
                method: 'POST',
                url: 'api/ops/saveinputsegments',
                data: {segmentMap: segmentMap},
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success( function(res) {
                callback(res);
            });

            /*
            var resPhrases = $resource('api/ops/saveinputsegments', {} , {
                query: { method:'POST', {segmentMap}, isArray:false }
            });
            resPhrases.query({}, function(res) { 
                callback(res);
            });
            */

        }
		
    };  // end return
		
}]);
