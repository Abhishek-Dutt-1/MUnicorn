'use strict';

var keywordSegmentsServices = angular.module('keywordSegmentsServices', ['ngResource']);

keywordSegmentsServices.service('DataShareService', ['$http', '$q', '$resource', '$rootScope', function ($http, $q, $resource, $rootScope) {
    
	var actualData, stopWordList, negativeKeywordList, selectedDataAccount;
    selectedDataAccount = {};
	var themeObject = {};

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

	return {
		// Get and Set a theme
		//themeName: themeName,
		setTheme: function(themeName) {
			themeObject.name = themeName;
			$rootScope.$emit('themeChange', themeName);
		},
		// Actual Data
        ////////////////////////////////////// get keywords for the keywords table
        fetchKeywords: function(pageNum, keywordsPerPage, sortOn, callback) {

            var resKeywords = $resource('api/keywords/' + selectedDataAccount.id + '/' + pageNum + '/' + keywordsPerPage + '/' + sortOn.field + '/' + sortOn.desc , {} , {
                query: { method:'GET', params:{}, isArray:false }
            });

            resKeywords.query( function(data) { 

                data.data.forEach( function(elem, index) {
					// ugly hack but no time
                    elem.KeywordStopWordHighlighted = elem.keyword;
                    elem.userInputSegmentArray = [];
                    elem.userInputSegment = '';
                });

                callback(data);
            });

        },

        // Get ALL keywords with given data account id
        fetchAllKeywords: function(callback, errorCallback) {

            var resKeywords = $resource('api/keywords/fetchallkeywords/' + selectedDataAccount.id, {} , {
                query: { method:'GET', params:{}, isArray:true }
            });

            resKeywords.query( function(data) { 
                data.forEach( function(elem, index) {
					// ugly hack but no time
                    //elem.avMonthlySearches = elem.avMonthlySearches * 1;
                    elem.KeywordStopWordHighlighted = elem.keyword;
                    elem.userInputSegmentArray = [];
                    elem.userInputSegment = '';
                    elem.userInput = {};
                    elem.userInput.stopword = false;
                    elem.userInput.negativeword = false;
                    elem.userInput.segment = [];
                    elem.segmentToString = '';
                    elem.userInput.hasSegment = false;
					elem.userInput.isBrand = false;
					elem.userInput.isCompete = false;
                });
                callback(data);
                //console.log(data);
            },
			function(err) {				// handle server error
				errorCallback({status: err.status, message: "Error fetching keywords"});
			});

        },
	
        getKeywordCount: function(callback) {
            var resKeywords = $resource('api/keywords/getkeywordcount/' + selectedDataAccount.id , {} , {
                query: { method:'GET', params:{}, isArray:false }
            });
            resKeywords.query( function(data) {
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

            var resStopWord = $resource('api/stopwords/' + selectedDataAccount.id, {}, {
              query: { method:'GET', params:{}, isArray:true }
            });

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
		updateStopWordList: function(data) {
			stopWordList = data;
		},
        */

        saveNewStopword: function(data, callback) {

            console.log(data);
            $resource('api/stopwords', {} , {
                query: { method:'POST', params:{dataaccountid: selectedDataAccount.id, stopword: data}, isArray:false }
            }).query( function(res) { 
                console.log(res); 
                callback(res); 
            } );
            //temp.query( function(res) { callback(res); } );
        },
			
        destroyStopWord: function(id, callback) {
            $resource('api/stopwords/' + id, {} , {
                query: { method:'DELETE', params:{}, isArray:false }
            }).query( function(res) { callback(res); } );
        },


		////////////////////////////// Negative Keyword List Data
		fetchNegativeKeywordList: function(callback) {

            var resNegativeKeyword = $resource('api/negativekeywords/' + selectedDataAccount.id, {}, {
              query: { method:'GET', params:{}, isArray:true }
            });

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
		updateNegativeKeywordList: function(data) {
			negativeKeywordList = data;
		},
        */

        saveNewNegativeKeyword: function(data, callback) {
            $resource('api/negativekeywords', {} , {
                query: { method:'POST', params:{dataaccountid: selectedDataAccount.id, Negativekeyword: data}, isArray:false }
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
                 query: { method:'POST', params:{ dataaccountid: selectedDataAccount.id, doNotDelete: doNotDelete }, isArray:false }
            }).query( function(res) { callback(res); } );
        },
        // delete matching negative keywords
        deleteMatchingNegativewordsFromKeywords: function(doNotDelete, callback) {
             $resource('api/ops/deletematchingnegativewordsfromkeywords', {} , {
                 query: { method:'POST', params:{ dataaccountid: selectedDataAccount.id, doNotDelete: doNotDelete }, isArray:false }
            }).query( function(res) { callback(res); } );
        },
        // delete order independent duplicates
        deleteDuplicatesFromKeywords: function(doNotDelete, callback) {
             $resource('api/ops/deleteduplicatesfromkeywords', {} , {
                 query: { method:'POST', params:{ dataaccountid: selectedDataAccount.id, doNotDelete: doNotDelete }, isArray:false }
            }).query( function(res) { callback(res); } );
        },

        /// Fetch subset of 2 word and 1 word phrases data -- NOT USED
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
            var resPhrases = $resource('api/ops/getallphrases/' + selectedDataAccount.id + '/' + phraselength, {} , {
                query: { method:'GET', params:{}, isArray:true }
            });
            // post processing
            resPhrases.query( function(data) { 
                callback(data);
            });
        },

        // Refresh segmentmap table with 1 and 2 words phrases by recalulating
        //counts
        refreshPhrases: function(callback, errorCallback) {

            var resPhrases = $resource('api/ops/refreshphrases/' + selectedDataAccount.id, {} , {
                query: { method:'GET', params:{}, isArray:false }
            });
            // post processing
            resPhrases.query( function(res) { 
                callback(res);
            }, function(err) {
				errorCallback({status: err.status, message: "Error fetching keyword data"});
			});

        },

        // Save user inputted segments to segments map table
        saveInputSegments: function(segmentMap, callback) {
            $http({
                method: 'POST',
                url: 'api/ops/saveinputsegments',
                data: {dataaccountid: selectedDataAccount.id, segmentMap: segmentMap},
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
        },

		
		
		
		
		
		
		
		/*
		
		fetchKeywords: function(pageNum, keywordsPerPage, sortOn, callback) {

            var resKeywords = $resource('api/keywords/' + selectedDataAccount.id + '/' + pageNum + '/' + keywordsPerPage + '/' + sortOn.field + '/' + sortOn.desc , {} , {
                query: { method:'GET', params:{}, isArray:false }
            });

            resKeywords.query( function(data) { 

                data.data.forEach( function(elem, index) {
					// ugly hack but no time
                    elem.KeywordStopWordHighlighted = elem.keyword;
                    elem.userInputSegmentArray = [];
                    elem.userInputSegment = '';
                });

                callback(data);
            });

        },
		*/
		
        // Fetch keywords and segemnt data
		fetchKeywordsAndSegmentsData: function(pageNum, keywordsPerPage, sortOn, callback) {

            var resKeywords = $resource('api/ops/fetchkeywordsandsegmentsdata/' + selectedDataAccount.id + '/' + pageNum + '/' + keywordsPerPage + '/' + sortOn.field + '/' + sortOn.desc , {} , {
                query: { method:'GET', params:{}, isArray:false }
            });

            resKeywords.query( function(data) { 
                /*
                data.forEach( function(elem, index) {
					// ugly hack but no time
                    elem.KeywordStopWordHighlighted = elem.keyword;
                    elem.userInputSegmentArray = [];
                    elem.userInputSegment = '';
                });
                */
                callback(data);
            });

        },

        // SELECT DATA :: Fetch Account Names
		fetchAllDataAccountNames: function(callback) {

            var resKeywords = $resource('api/dataaccounts', {} , {
                query: { method:'GET', params:{}, isArray:true }
            });

            resKeywords.query( function(data) { 
                // add a Trimmed url field
                data.forEach( function(elem) {
                    if(elem.landingPageUrls.length > 0)
                    {
                        elem.landingPageUrls.forEach( function(e) {
                            if(e.landingpageurl.length > 50)
                                e.landingpageurlTrimmed = e.landingpageurl.substring(0,47) + "...";
                            else
                                e.landingpageurlTrimmed = e.landingpageurl;
                        });
                    }
                });
                callback(data);
            });

        },
        
        // SELECT DATA :: Fetch Data set for a given user
        fetchDataSetsByUserId: function(userId, callback) {

            var resKeywords = $resource('api/ops/fetchdatasetsbyuserid/' + userId, {} , {
                query: { method:'GET', params:{}, isArray:true }
            });

            resKeywords.query( function(data) { 
                // add a Trimmed url field
                data.forEach( function(elem) {
                    if(elem.landingPageUrls.length > 0)
                    {
                        elem.landingPageUrls.forEach( function(e) {
                            if(e.landingpageurl.length > 50)
                                e.landingpageurlTrimmed = e.landingpageurl.substring(0,47) + "...";
                            else
                                e.landingpageurlTrimmed = e.landingpageurl;
                        });
                    }
                });
                callback(data);
            });

        },
        // SELECT DATA :: Save new Account Name
		saveNewDataAccount: function(dataaccount, user, callback) {

            $resource('api/dataaccounts', {} , {
                query: { method:'POST', params:{dataaccount: dataaccount, user: user}, isArray:false }
            }).query( function(res) { callback(res); } );

        },
        // SELECT DATA :: Delete a Data Account Name
		deleteDataAccount: function(dataAccountId, callback) {

            $resource('api/dataaccounts/' + dataAccountId, {} , {
                query: { method:'DELETE', params:{}, isArray:false }
            }).query( function(res) {
				callback(res);
				selectedDataAccount.id = -1;
				selectedDataAccount.name = null;
			} );

        },

        // store current selected data account in local variable for
        // persistance across Views
        setSelectedDataAccount: function(dataAccountId, dataAccountName, landingPageUrls, callback) {
            selectedDataAccount.id = dataAccountId;            
            selectedDataAccount.name = dataAccountName;            
            selectedDataAccount.landingPageUrls = landingPageUrls;            

            callback(selectedDataAccount);
        },
		unsetSelectedDataAccount: function() {
			selectedDataAccount = {};
            return selectedDataAccount;
        },
        getSelectedDataAccount: function() {
            return selectedDataAccount;
        },

        /// Download data as CSV
        downloadCSV: function(callback) {

            var resKeywords = $resource('api/ops/downloadcsv/' + selectedDataAccount.id, {} , {
                query: { method:'GET', params:{}, isArray:false }
            });

            resKeywords.query( function(data) { 
                callback(data);
            });
               
        },

        getTagCloud: function( callback, errorCallback ) {

             var resKeywords = $resource('api/wordcloud/gettagcloud/' + selectedDataAccount.id, {} , {
                query: { method:'GET', params:{}, isArray: true }
            });

            resKeywords.query( function(data) { 
                callback(data);
            },
				function(err) {				// handle server error
					errorCallback({status: err.status, message: "Error fetching tag cloud"});
			});
           
        },

        /// Step 5: delete delete ids and save segments
        saveSegmentMap: function(segmentMap, idsToBeDeleted, callback) {

            /*
            $resource('api/wordcloud/savesegmentmap/', {} , {
//                query: { method:'POST', params: {toBeDeleted: deleteIds, segmentMap: segmentMap}, isArray:false }
                query: { method:'POST', params: {segmentMap: segmentMap}, isArray:false }

            }).query( function(res) { callback(res); } );
            */
            $http({
                method: 'POST',
                url: 'api/wordcloud/savesegmentmap/' + selectedDataAccount.id,
                data: {segmentMap: segmentMap, idsToBeDeleted: idsToBeDeleted},
                //data: {dataaccountid: selectedDataAccount.id, segmentMap: segmentMap},
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success( function(res) {
                callback(res);
            });
        },

        // trying advanced resorces
        LandingPageUrl: $resource('api/landingpageurls', {},
            {
                // overload delete
                delete: {method: 'DELETE', url: 'api/landingpageurls/:id', params: {id: '@id'} , isArray: false }
            }),
        /*
        saveLandingPageUrl: function(userInputUrl, callback) {
             LandingPageUrl.save( {dataaccount: selectedDataAccount.id, landingpageurl: userInputUrl}, function(res) { callback(res); } );
        }
        */
        // trying advanced Ops resouces 
        ops: $resource('api/ops', {},
            {
                getLandingPageWordCloud: {method: 'GET', url: 'api/ops/getlandingpagewordcloud/:id', params: {id: '@id'} , isArray: true },
                deleteLandingPageWordCloudElement: {method: 'DELETE', url: 'api/ops/deletelandingpagewordcloudelement/:id', params: {id: '@landingPageWordId'} , isArray: false },
                rescrapeLandingPage: {method: 'GET', url: 'api/ops/scrapelandingpage/:id', params: {id: '@landingPageId'} , isArray: false },
                ///////////// USER AUTHENTICATION <--- should be put in a seprate sevice
                //loginUser: {method: 'POST', url: 'api/ops/loginuser', params: {email: '@email', password: '@password'}, isArray: false}
            }),

        User: $resource('api/users/:id', {id: '@id'}),      // One resource to rule them all



    };  // end return
		
}]);
