'use strict';

keywordSegmentsControllers.controller('Step5Ctrl', ['$scope', '$http', '$filter', 'ngProgress', 'DataShareService', function ($scope, $http, $filter, ngProgress, DataShareService) {
    $scope.numShowKeywords = 10;
    $scope.currentPageNum = 0;
    $scope.currentKeywordsMatched = 0;
	$scope.countArray = []

    $scope.actualDataPhrases = [];
    $scope.actualDataPhrases1Word = [];

    $scope.numShowPhrases = 10;
    $scope.numShowPhrases1Word = 10;

    $scope.currentPageNumPhrases = 0;
    $scope.currentPageNumPhrases1Word = 0;

    $scope.userSegmentsSaved = true;

    $scope.selectedDataAccount = {};

    $scope.phrasesSavingSpinner = false;
    $scope.phrasesSavingSpinner1Word = false;
    
    $scope.phrasesLoadingSpinner = false;
    $scope.phrasesLoadingSpinner1Word = false;

    $scope.showPhrases1WordTable = false;

	$scope.totalDataRowsCount = 0;
    $scope.currentTopRow = 0;       // 0 == first row
    $scope.keywordLastPage = false;
    $scope.keywordFirstPage = true;
    $scope.showAllTags = false;
	$scope.selectedWordCloud = 0;
	
    $scope.trackSort = {
            sortOn: {field: 'id', desc: false}, 
            track: [
            {field: 'keyword', desc: true}, 
            {field: 'segmentToString', desc: true}, 
            {field: 'avMonthlySearches', desc: true},
            {field: 'landingPageKeywordScore', desc: true},
			{field: 'COMPETE', desc: true},
			{field: 'BRAND', desc: true},
			{field: 'DELETE', desc: true},] 
        };

    $scope.wordCloudArray = [];   
    $scope.wordCloudNumWord = 1;
    $scope.tagsArray1Word = [];
    $scope.tagsArray2Word = [];

    $scope.segmentsSavingSpinner = false;
    $scope.idsToBeDeleted = [];
    $scope.formToggle = true;
	
	$scope.brandTerms = ["brand"];
	$scope.competeTerms = ["compete"];
	
	$scope.errorArray = [];
    //////////////////////////// Keywords Table and Pager /////////////////////////
    // Updates pager(at the bottom of the table) on initial load and on change of numShowKeywords
    $scope.changePage = function(next) {

        if(next >= 0)
        {
            //$scope.currentPageNum = ($scope.totalDataRowsCount > ($scope.currentPageNum + 1) * $scope.numShowKeywords) ? $scope.currentPageNum + 1 : $scope.currentPageNum;
            if( $scope.actualData.length > Number($scope.currentTopRow) + Number($scope.numShowKeywords) )
            {
                //$scope.currentPageNum = $scope.currentPageNum + 1;
                $scope.currentTopRow  = Number($scope.currentTopRow) + Number($scope.numShowKeywords);
                $scope.updateKeywordTable();

            } else
            {
                // already at last page. do nothing;
                console.log("Last Page :: " + $scope.currentTopRow + " : " + $scope.numShowKeywords + " = " + (Number($scope.currentTopRow) + Number($scope.numShowKeywords)) + " :: " + $scope.totalDataRowsCount);
            }
//            $scope.currentPageNum++;
//            DataShareService.fetchKeywords( $scope.currentPageNum * $scope.numShowKeywords , $scope.numShowKeywords, function(data) { $scope.dummyData = data; } );
        } else
        {
            //$scope.currentPageNum = ($scope.currentPageNum === 0) ? 0 : $scope.currentPageNum - 1;
            //$scope.currentTopRow = ($scope.currentTopRow <= 1) ? 1 : $scope.currentTopRow - $scope.numShowKeywords;
            if( $scope.currentTopRow > 0 )
            {
                $scope.currentTopRow = ($scope.currentTopRow - $scope.numShowKeywords <= 0) ? 0 : $scope.currentTopRow - $scope.numShowKeywords;
                $scope.updateKeywordTable();
            } else
            {
                // already at the first page. do nothing
            }
//           DataShareService.fetchKeywords( $scope.currentPageNum, $scope.numShowKeywords, function(data) { $scope.dummyData = data; } );
        }
        //$scope.updateKeywordTable();
    };

    $scope.updateKeywordTable = function() {
        // Calculate Keywords to show
        $scope.dummyData = $scope.actualData.slice($scope.currentTopRow, $scope.currentTopRow*1 + $scope.numShowKeywords*1);
//        $scope.applyUserInputsToKeywords();

        if( $scope.actualData.length > Number($scope.currentTopRow) + Number($scope.numShowKeywords) ) {
            $scope.keywordLastPage = false;
        } else {
            $scope.keywordLastPage = true;
        }
        // update pager
        if( $scope.currentTopRow > 1 ) {
            $scope.keywordFirstPage = false;
        } else {
            $scope.keywordFirstPage = true;
        }



//        $scope.bulkApplyUserSegments();
//        $scope.bulkApplyUserSegments1Word();

/*       
        // ($scope.currentTopRow - 1) since that corresponds to number of rows to skip
        DataShareService.fetchKeywords( $scope.currentTopRow - 1, $scope.numShowKeywords, $scope.trackSort.sortOn, function(data) { 

            //console.log( $scope.currentTopRow + " :: " + $scope.numShowKeywords );
            $scope.dummyData = data.data; 
            $scope.totalDataRowsCount = data.count;

            // update pager
            if( $scope.totalDataRowsCount > Number($scope.currentTopRow) + Number($scope.numShowKeywords) ) {
                $scope.keywordLastPage = false;
            } else {
                $scope.keywordLastPage = true;
            }
            console.log($scope.keywordLastPage);
            // update pager
            if( $scope.currentTopRow > 1 ) {
                $scope.keywordFirstPage = false;
            } else {
                $scope.keywordFirstPage = true;
            }

            $scope.bulkApplyUserSegments();
            $scope.bulkApplyUserSegments1Word();
        } );
*/
    };

/* 
    $scope.changePage = function(next) {
        if(next >= 0)
        {
            //$scope.currentPageNum = ($scope.totalDataRowsCount > ($scope.currentPageNum + 1) * $scope.numShowKeywords) ? $scope.currentPageNum + 1 : $scope.currentPageNum;
            if( $scope.totalDataRowsCount > Number($scope.currentTopRow) + Number($scope.numShowKeywords) )
            {
                //$scope.currentPageNum = $scope.currentPageNum + 1;
                $scope.currentTopRow  = Number($scope.currentTopRow) + Number($scope.numShowKeywords);
                $scope.updateKeywordTable();
            } else
            {
                // already at last page. do nothing;
                console.log("Last Page :: " + $scope.currentTopRow + " : " + $scope.numShowKeywords + " = " + (Number($scope.currentTopRow) + Number($scope.numShowKeywords)) + " :: " + $scope.totalDataRowsCount);
            }
//            $scope.currentPageNum++;
//            DataShareService.fetchKeywords( $scope.currentPageNum * $scope.numShowKeywords , $scope.numShowKeywords, function(data) { $scope.dummyData = data; } );
        } else
        {
            //$scope.currentPageNum = ($scope.currentPageNum === 0) ? 0 : $scope.currentPageNum - 1;
            //$scope.currentTopRow = ($scope.currentTopRow <= 1) ? 1 : $scope.currentTopRow - $scope.numShowKeywords;
            if( $scope.currentTopRow > 1 )
            {
                $scope.currentTopRow = ($scope.currentTopRow - $scope.numShowKeywords <= 1) ? 1 : $scope.currentTopRow - $scope.numShowKeywords;
                $scope.updateKeywordTable();
            } else
            {
                // already at the last page. do nothing
            }
//           DataShareService.fetchKeywords( $scope.currentPageNum, $scope.numShowKeywords, function(data) { $scope.dummyData = data; } );
        }
        //$scope.updateKeywordTable();
    };
*/
/*
    $scope.updateKeywordTable = function() {
        //DataShareService.fetchKeywords( $scope.currentPageNum * $scope.numShowKeywords, $scope.numShowKeywords, function(data) { 

        // ($scope.currentTopRow - 1) since that corresponds to number of rows to skip
        DataShareService.fetchKeywords( $scope.currentTopRow - 1, $scope.numShowKeywords, $scope.trackSort.sortOn, function(data) { 

            //console.log( $scope.currentTopRow + " :: " + $scope.numShowKeywords );
            $scope.dummyData = data.data; 
            $scope.totalDataRowsCount = data.count;

            // update pager
            if( $scope.totalDataRowsCount > Number($scope.currentTopRow) + Number($scope.numShowKeywords) ) {
                $scope.keywordLastPage = false;
            } else {
                $scope.keywordLastPage = true;
            }
            console.log($scope.keywordLastPage);
            // update pager
            if( $scope.currentTopRow > 1 ) {
                $scope.keywordFirstPage = false;
            } else {
                $scope.keywordFirstPage = true;
            }

            $scope.bulkApplyUserSegments();
            $scope.bulkApplyUserSegments1Word();
        } );
    };
*/
	/*
    $scope.changePage = function(next) {
        if(next >= 0) {
            $scope.currentPageNum++;
//            DataShareService.fetchKeywords( $scope.currentPageNum * $scope.numShowKeywords , $scope.numShowKeywords, function(data) { $scope.dummyData = data; } );
        } else {
            $scope.currentPageNum = ($scope.currentPageNum === 0) ? 0 : $scope.currentPageNum - 1;
//           DataShareService.fetchKeywords( $scope.currentPageNum, $scope.numShowKeywords, function(data) { $scope.dummyData = data; } );
        }
        $scope.updateKeywordTable();
    };

    $scope.updateKeywordTable = function() {

        DataShareService.fetchKeywords( $scope.currentPageNum * $scope.numShowKeywords, $scope.numShowKeywords, function(data) {
            $scope.dummyData = data;
            $scope.bulkApplyUserSegments();
            $scope.bulkApplyUserSegments1Word();
        } );

    };
*/
/*
    $scope.changePage = function(next) {
        if(next >= 0) {
            $scope.currentPageNum = ($scope.actualData.length > ($scope.currentPageNum+1)*$scope.numShowKeywords) ? $scope.currentPageNum + 1 : $scope.currentPageNum;
        } else {
            $scope.currentPageNum = ($scope.currentPageNum === 0)? 0 : $scope.currentPageNum - 1;
        }
        $scope.updateKeywordTable();
    };

    // Updates keywordstable on initial load and on change of numShowKeywords
    $scope.updateKeywordTable = function() {
        // Calculate Keywords to show
        // First page is currentPageNum = 0
        var startIndex = 0;
        if( Number( $scope.currentPageNum * $scope.numShowKeywords ) < Number($scope.actualData.length) ) {
            startIndex = Number( $scope.currentPageNum * $scope.numShowKeywords );
        } else {
            // Changed startIndex is too high set it to 0 and start page also
            // to 0
            startIndex = 0;
            $scope.currentPageNum = 0;
        }
        var endIndex = Number( (Number(startIndex) + Number($scope.numShowKeywords) < Number($scope.actualData.length)) ? Number(startIndex) + Number($scope.numShowKeywords) : $scope.actualData.length );
        $scope.dummyData = $scope.actualData.slice(startIndex, endIndex);
    };
*/
    //////////////////////////// End Keywords Table and Pager /////////////////////////
    
    // Mark matches between keywords and Negative Keyword List
/*
    $scope.markMatches = function() {
       //actualData vs StopWordList Matching Code Here 
        $scope.actualData = $scope.actualData.map( function(currentValue, index, array) {   // Map returns a new array leaving orginal array untouched

            if(typeof $scope.negativeKeywordList !== 'undefined') {       // Mark all false if stopWordsList does not exists
                if($scope.negativeKeywordList.length > 0) {               // Exist and has at least one element
                    if($scope.negativeKeywordList.some( function(negativeKeyword, index, array) {    //  .some returns true for matches at least one match
                        //stopWord.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');        // Clean stopWord of special characters
                        //stopWord = "\\b\\"+ stopWord + "\\b";                          // create a regexp
                        return new RegExp('\\b' + negativeKeyword + '\\b', 'i').test(currentValue.Keyword);    // returns true of false
                    }) === true) {
                        currentValue.negativeKeywordMatch = true;                      // atleast one match found in the stop word list for current keyword
                        return currentValue;
                    } else {
                         //currentValue.negativeKeywordMatch = false;                    // no match found
                         return currentValue;
                    }
                } else {
                    //currentValue.negativeKeywordMatch = false;                         // No element in stopWordsList
                    return currentValue;
                }
            } else {
                //currentValue.negativeKeywordMatch = false;                             // stopWOrdsList not defined
                return currentValue;
            }
        });
        countMatchedKeywords();
    };
*/

    // Reset button pressed
    $scope.resetMatches = function() {
        $scope.dummyData.forEach( function(elem, index){
            elem.userInputSegmentArray = [];
            elem.userInputSegment = '';
        });

        $scope.dummyDataPhrases.forEach( function(elem, index){
            elem.segments = '';
        });

        $scope.dummyDataPhrases1Word.forEach( function(elem, index){
            elem.segments = '';
        });

        $scope.userSegmentsSaved = false;
    };

    // Delete matches
/*
    $scope.deleteMatches = function() {
        $scope.actualData = $scope.actualData.filter( function(element, index) {
			return !element.negativeKeywordMatch;
        });
		DataShareService.updateActualData($scope.actualData);
        $scope.updateKeywordTable();
        countMatchedKeywords();
    };
*/

    // Handle manula delete check box toggle 
    $scope.negativeKeyowrdCheckBoxToggle = function(id) {
        $scope.actualData.forEach( function(element, index){
            if(element.id === id) {
                element.userInput.negativeword = !element.userInput.negativeword; 
            }
        });
        //$scope.updateKeywordTable();
        countMatchedKeywords();
    };

    // Maintain a count of keywords currently matched (local function);
    var countMatchedKeywords = function() {
        $scope.currentKeywordsMatched = 0; 
        $scope.dummyData.forEach( function(element, index) {
            if(element.userInputSegment != '') {
                $scope.currentKeywordsMatched = $scope.currentKeywordsMatched + 1;
            }
        });
    };

    //////////////////////////// Handle Manual segment input Interface and Pager ///////////////////
	// Fetch keywords count list
	$scope.keywordCount = function() {
		$scope.actualData.forEach( function(element, index) {
			element.Keyword.split(' ').forEach( function(elem, ind) {
				var temp = elem.trim();
				if(typeof $scope.countArray[temp] === 'undefined') {
					$scope.countArray[temp] = 1;
				} else {
					$scope.countArray[temp] = $scope.countArray[temp] + 1;
				}
			})
		});
		$scope.bySortedValue($scope.countArray, function(key, value) {
			//console.log(key + ": " + value);
			$scope.countArraySorted.push({Keyword: key, count: value, userInputSegment: '', userInputSegmentArray: []});
		});
		///$scope.updateKeywordTable();
       // $scope.twoKeywordCount();
	};

    // count two word phrases
/*
    $scope.twoKeywordCount = function() {
        var temp, tempJoin;
        var i, tempArray = [];
        $scope.actualData.forEach( function(elem, ind) {
            temp = elem.Keyword.split(' ');
            temp = temp.filter(function(e){return e.trim();}); 
            for(i = 0; i < temp.length; i++) {
                if(temp.slice(i,i+2).length == 2){
                tempJoin = temp.slice(i, i+2).join(' ');
                    $scope.actualData.forEach( function(e, index) {
                        //console.log(i + " " + temp.join(":") + " :: " + temp.slice(i,i+2).join(":") + " " + temp.slice(i,i+2).length);
                        //console.log(e.Keyword.search(temp.slice(i,i+2).join(' ')));
                        if(ind != index) {
//                            if( !tempArray.some( function(element) { return element == temp.slice(i,i+2).join(' '); }) ) {
                            if( tempArray.join(' ').search( tempJoin ) == -1 ) {
                            //if( ! new RegExp('\\b' + tempJoin + '\\b', 'ig').test( tempArray.join(' ')) ) {    // returns true or false
                                if( e.Keyword.search( tempJoin ) != -1 ){
                                    tempArray.push( tempJoin );
                                    //console.log( tempJoin + " ::  " + e.Keyword);
                                }
                                //if(e.Keyword.search(temp.slice(i,i+2).join(' '))
                            }
                        }
                    });
                }
            }
        });
    };
*/

    // local function to sort keyword count sudo assoc array
/*
	$scope.bySortedValue = function(obj, callback, context) {
		var tuples = [];
		for (var key in obj) {
			tuples.push([key, obj[key]]);
		}
		tuples.sort(function(a, b) { return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0 });
		tuples.reverse();
		var length = tuples.length;
		while (length--) callback.call(context, tuples[length][0], tuples[length][1]);
		//bySortedValue(someObj, this.method, this);
	};
*/


    // Updates pager(at the bottom of the table) on initial load and on change of numShowKeywords
/*
    $scope.changePagePhrases = function(next) {
        if(next >= 0) {
            $scope.currentPageNumPhrases++;
//            DataShareService.fetchKeywords( $scope.currentPageNum * $scope.numShowKeywords , $scope.numShowKeywords, function(data) { $scope.dummyData = data; } );
        } else {
            $scope.currentPageNumPhrases = ($scope.currentPageNumPhrases === 0) ? 0 : $scope.currentPageNumPhrases - 1;
//           DataShareService.fetchKeywords( $scope.currentPageNum, $scope.numShowKeywords, function(data) { $scope.dummyData = data; } );
        }
        $scope.updatePhrasesTable();
    };

    $scope.updatePhrasesTable = function() {
        DataShareService.fetchPhrases( $scope.currentPageNumPhrases * $scope.numShowPhrases, $scope.numShowPhrases, function(data) { 
            $scope.dummyDataPhrases = data; 
            $scope.bulkApplyUserSegments();
        } );
    };
*/

///////////////////////////////////////////////////////// 2 Words Phrases
    $scope.changePagePhrases = function(next) {
        if(next >= 0) {
            $scope.currentPageNumPhrases = ($scope.actualDataPhrases.length > ($scope.currentPageNumPhrases+1)*$scope.numShowPhrases) ? $scope.currentPageNumPhrases + 1 : $scope.currentPageNumPhrases;
        } else {
            $scope.currentPageNumPhrases = ($scope.currentPageNumPhrases === 0)? 0 : $scope.currentPageNumPhrases - 1;
        }
        $scope.updatePhrasesTable();
    };

    // Updates phrases on initial load and on change of numShowPhrases
    $scope.updatePhrasesTable = function() {
        // Calculate Keywords to show
        // First page is currentPageNum = 0
        var startIndex = 0;
        if( Number( $scope.currentPageNumPhrases * $scope.numShowPhrases ) < Number($scope.actualDataPhrases.length) ) {
            startIndex = Number( $scope.currentPageNumPhrases * $scope.numShowPhrases );
        } else {
            // Changed startIndex is too high set it to 0 and start page also
            // to 0
            startIndex = 0;
            $scope.currentPageNumPhrases = 0;
        }
        var endIndex = Number( (Number(startIndex) + Number($scope.numShowPhrases) < Number($scope.actualDataPhrases.length)) ? Number(startIndex) + Number($scope.numShowPhrases) : $scope.actualDataPhrases.length );
        $scope.dummyDataPhrases = $scope.actualDataPhrases.slice(startIndex, endIndex);
    };

///////////////////////////////////////////////////////// 1 Words Phrases
    $scope.changePagePhrases1Word = function(next) {
        if(next >= 0) {
            $scope.currentPageNumPhrases1Word = ($scope.actualDataPhrases1Word.length > ($scope.currentPageNumPhrases1Word+1)*$scope.numShowPhrases1Word) ? $scope.currentPageNumPhrases1Word + 1 : $scope.currentPageNumPhrases1Word;
        } else {
            $scope.currentPageNumPhrases1Word = ($scope.currentPageNumPhrases1Word === 0)? 0 : $scope.currentPageNumPhrases1Word - 1;
        }
        $scope.updatePhrasesTable1Word();
    };

    // Updates phrases on initial load and on change of numShowPhrases
    $scope.updatePhrasesTable1Word = function() {
        // Calculate Keywords to show
        // First page is currentPageNum = 0
        var startIndex = 0;
        if( Number( $scope.currentPageNumPhrases1Word * $scope.numShowPhrases1Word ) < Number($scope.actualDataPhrases1Word.length) ) {
            startIndex = Number( $scope.currentPageNumPhrases1Word * $scope.numShowPhrases1Word );
        } else {
            // Changed startIndex is too high set it to 0 and start page also
            // to 0
            startIndex = 0;
            $scope.currentPageNumPhrases1Word = 0;
        }
        var endIndex = Number( (Number(startIndex) + Number($scope.numShowPhrases1Word) < Number($scope.actualDataPhrases1Word.length)) ? Number(startIndex) + Number($scope.numShowPhrases1Word) : $scope.actualDataPhrases1Word.length );
        $scope.dummyDataPhrases1Word = $scope.actualDataPhrases1Word.slice(startIndex, endIndex);
    };

/*
    $scope.changePagePhrases = function(next) {
        if(next >= 0) {
            $scope.currentPageNumPhrases = ($scope.countArraySorted.length > ($scope.currentPageNumPhrases+1)*$scope.numShowKeywordsPhrases) ? $scope.currentPageNumPhrases + 1 : $scope.currentPageNumPhrases;
        } else {
            $scope.currentPageNumPhrases = ($scope.currentPageNumPhrases === 0)? 0 : $scope.currentPageNumPhrases - 1;
        }
        $scope.updatePhrasesTable();
    };

    // Updates keywordstable on initial load and on change of numShowKeywords
    $scope.updatePhrasesTable = function() {
        // Calculate Keywords to show
        // First page is currentPageNum = 0
        var startIndex = 0;
        if( Number( $scope.currentPageNumPhrases * $scope.numShowKeywordsPhrases ) < Number($scope.countArraySorted.length) ) {
            startIndex = Number( $scope.currentPageNumPhrases * $scope.numShowKeywordsPhrases );
        } else {
            // Changed startIndex is too high set it to 0 and start page also
            // to 0
            startIndex = 0;
            $scope.currentPageNumPhrases = 0;
        }
        var endIndex = Number( (Number(startIndex) + Number($scope.numShowKeywordsPhrases) < Number($scope.countArraySorted.length)) ? Number(startIndex) + Number($scope.numShowKeywordsPhrases) : $scope.actualData.length );
        $scope.dummyDataPhrases = $scope.countArraySorted.slice(startIndex, endIndex);
        //console.log($scope.dummyDataPhrases);
    };
*/

//////////////////////////////////////////// 2 Word Phrases
    // Bulk apply user segments
    $scope.bulkApplyUserSegments = function() {
        $scope.actualDataPhrases.forEach( function(elem, ind) {
             $scope.applyUserSegments(elem.id, elem.segments, true);
        });
    };

    $scope.applyUserSegments = function(phraseId, userSegment, isBulk) {

        // dont change save button color in case of bulkApplyUserSegments
        if(!isBulk) { $scope.userSegmentsSaved = false; }

        var keyword
        $scope.actualDataPhrases.forEach(function(elem, ind) {
            if(elem.id === phraseId) {
                elem.segments = userSegment;
                keyword = elem.phrase;
            }
        });
         
        $scope.dummyData.forEach(function(elem, ind) {
            if(new RegExp('\\b' + keyword + '\\b', 'i').test(elem.keyword)) {    // returns true or false

                elem.userInputSegmentArray[keyword] = userSegment.split(',');

                elem.userInputSegment = '';
                for (var key in elem.userInputSegmentArray) {
                    //console.log(elem.userInputSegmentArray[key].join());
                    if(elem.userInputSegmentArray[key].join().length) {
						elem.userInputSegment = elem.userInputSegment + ", " + elem.userInputSegmentArray[key].join();
//                    console.log(elem.userInputSegmentArray[key].join(", "));
                    }
                }
                elem.userInputSegment = elem.userInputSegment.substring(2, elem.userInputSegment.length);
//                console.log(elem.userInputSegment);
                //elem.userInputSegment = elem.userInputSegmentArray.map( function(element, index) {
                //};
                //console.log(elem);
            }
        });
		countMatchedKeywords();
    };

//////////////////////////////////////////// 1 Word Phrases
    // Bulk apply user segments
    $scope.bulkApplyUserSegments1Word = function() {
        $scope.actualDataPhrases1Word.forEach( function(elem, ind) {
             $scope.applyUserSegments1Word(elem.id, elem.segments, true);
        });
    };

    $scope.applyUserSegments1Word = function(phraseId, userSegment, isBulk) {

        // dont change save button color in case of bulkApplyUserSegments
        if(!isBulk) { $scope.userSegmentsSaved = false; }

        var keyword
        $scope.actualDataPhrases1Word.forEach(function(elem, ind) {
            if(elem.id === phraseId) {
                elem.segments = userSegment;
                keyword = elem.phrase;
            }
        });
        
        $scope.dummyData.forEach(function(elem, ind) {
            if(new RegExp('\\b' + keyword + '\\b', 'i').test(elem.keyword)) {    // returns true or false

                elem.userInputSegmentArray[keyword] = userSegment.split(',');

                elem.userInputSegment = '';
                for (var key in elem.userInputSegmentArray) {
                    //console.log(elem.userInputSegmentArray[key].join());
                    if(elem.userInputSegmentArray[key].join().length) {
						elem.userInputSegment = elem.userInputSegment + ", " + elem.userInputSegmentArray[key].join();
//                    console.log(elem.userInputSegmentArray[key].join(", "));
                    }
                }
                elem.userInputSegment = elem.userInputSegment.substring(2, elem.userInputSegment.length);
//                console.log(elem.userInputSegment);
                //elem.userInputSegment = elem.userInputSegmentArray.map( function(element, index) {
                //};
                //console.log(elem);
            }
        });
		countMatchedKeywords();
    };


//////////////////////////////////////// 
/*
	// save button pressed
    $scope.saveInputSegments = function() {

        $scope.phrasesSavingSpinner = true;

        var segmentMap = [];
        $scope.actualDataPhrases.forEach( function(elem, ind) {
            segmentMap.push({
                    id: elem.id,
                    segments: elem.segments
                });
        });
        $scope.actualDataPhrases1Word.forEach( function(elem, ind) {
            segmentMap.push({
                    id: elem.id,
                    segments: elem.segments
                });
        });
        //segmentMap = JSON.stringify(segmentMap);
        DataShareService.saveInputSegments(segmentMap, function(res) {
            console.log(res);
            $scope.userSegmentsSaved = true;
            $scope.phrasesSavingSpinner = false;
            console.log($scope.phrasesSavingSpinner);
        });
    };
*/

    $scope.switchWordCloudTable = function(phraseLength) {
        
        if(phraseLength == 1) 
        {
            //$scope.showPhrases1WordTable = true;
            //$scope.wordCloudArray = $scope.wordCloudArray1Word;
            $scope.wordCloudNumWord = 1;
        }
        if(phraseLength == 2) 
        {
            //$scope.showPhrases1WordTable = false;
            //$scope.wordCloudArray = $scope.wordCloudArray2Word;
            $scope.wordCloudNumWord = 2;
        }

        /*
        var filterObj = {hasSegment: true};
        $filter('filter')($scope.wordCloudArray, filterObj, false).forEach( function(elem) {
            console.log(elem.segmentArray.toString() + "  " + elem.word);
        });
        */

    };

/*
    $scope.applyUserSegments = function(keyword, segment) {
        //console.log(keyword + " :: " + segment);
        $scope.countArraySorted.forEach(function(elem, ind) {
            if(elem.Keyword === keyword) {
                elem.userInputSegment = segment;
            }
        });
        
        $scope.actualData.forEach(function(elem, ind) {
            if(new RegExp('\\b' + keyword + '\\b', 'i').test(elem.Keyword)) {    // returns true or false

                elem.userInputSegmentArray[keyword] = segment.split(',');

                elem.userInputSegment = '';
                for (var key in elem.userInputSegmentArray) {
                    //console.log(elem.userInputSegmentArray[key].join());
                    if(elem.userInputSegmentArray[key].join().length) {
						elem.userInputSegment = elem.userInputSegment + ", " + elem.userInputSegmentArray[key].join();
//                    console.log(elem.userInputSegmentArray[key].join(", "));
                    }
                }
                elem.userInputSegment = elem.userInputSegment.substring(2, elem.userInputSegment.length);
//                console.log(elem.userInputSegment);
                //elem.userInputSegment = elem.userInputSegmentArray.map( function(element, index) {
                //};
                //console.log(elem);
            }
        });
		countMatchedKeywords();
    };
*/
    //////////////////////////// End Table and Pager /////////////////////////

/*
	$http.get('scripts/NegativeKeywords_Step1.txt').success(function(data) {
    // Create JS array splitting at new line
		data = data.split('\r\n');
        $scope.addNegativeKeywordList(data);
	});
*/
/*
    // Delete a Stop Word from the displayed list
    $scope.deleteNegativeKeyword = function(negativeKeyword) {
        $scope.negativeKeywordList.splice( $scope.negativeKeywordList.indexOf(negativeKeyword), 1 );
    };
*/
/*
    // Add button pressed
    // Add a new user input Stop Word to the displayed list
    $scope.addNewNegativeKeyword = function(newNegativeKeyword) {
        if(typeof newNegativeKeyword !== 'undefined') {
            // Replace , with space
            newNegativeKeyword = newNegativeKeyword.split(',').join(' ');
            // Replace multiple consicutive space with one space
            newNegativeKeyword = newNegativeKeyword.replace(/(\s)+/g, '$1');
            // Dont add only blank space input
            if(newNegativeKeyword !== '') {
                // Split at space
                $scope.addNegativeKeywordList(newNegativeKeyword.split(' '));
				//$scope.markMatches();
				$scope.newNegativeKeyword = "";
            }
        }
    };
*/
/*
    // Add string array to StopeWordsList
    $scope.addNegativeKeywordList = function(data) {
        // Merge new array with any existing data
        if(typeof $scope.negativeKeywordList !== 'undefined') {
            data = data.concat($scope.negativeKeywordList);
        }
        // Make all words lower case
        //data = $.map(data, function(item) {
        data.forEach(function(item, index) {
            item = item.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');        // Clean stopWord of special characters
            return item.toLowerCase();
        });
        // Remove duplicates
        data = data.filter(function(elem, pos) {
            return data.indexOf(elem) === pos;
        });
        data.sort();
        $scope.negativeKeywordList = data;
    };
*/

    // Step 5 :: Save button pressed
    $scope.saveButtonPressed = function()
    {
        $scope.segmentsSavingSpinner = true;

        $scope.deleteNegativeWordsLocal();
		
		// Remove braded and compete words from segment string
		$scope.wordCloudArray.forEach( function(elem)
		{
			if(elem.brand == true) 
			{
				$scope.brandTerms.forEach( function(e1) {
					if(elem.segmentArray.indexOf( e1 ) > -1)
					{
						elem.segmentArray.splice( elem.segmentArray.indexOf( e1 ), 1);
					}
				});
				elem.segment = elem.segmentArray.toString();		// removed the brand words now reset the segment string
			}
			if(elem.compete == true) 
			{
				$scope.competeTerms.forEach( function(e1) {
					if(elem.segmentArray.indexOf( e1 ) > -1)
					{
						elem.segmentArray.splice( elem.segmentArray.indexOf( e1 ), 1);
					}
				});
				elem.segment = elem.segmentArray.toString();		// removed the brand words now reset the segment string
			}
		});
	
//        DataShareService.saveSegmentMap( $scope.wordCloudArray, $scope.idsToBeDeleted , function(res) {
        DataShareService.saveSegmentMap( $scope.wordCloudArray, $scope.idsToBeDeleted, function(res) {
            $scope.segmentsSavingSpinner = false;
            $scope.getTagCloud();
            $scope.userSegmentsSaved = true;
        });
/*
        var deleteIds = [];
        var segmentMap = [];

        $scope.actualData.forEach( function(keyword)
        {
            if(keyword.userInput.negativeword == true) {
                deleteIds.push(keyword.id);
            } else if(keyword.userInput.hasSegment) {
                segmentMap.push( { 'id': keyword.id, 'segment': keyword.segmentToString } );
            }
        });
//        console.log(deleteIds);
//        console.log(segmentMap);
        var segMap = {'toBeDeleted': deleteIds, 'segmentMap': segmentMap};
        console.log(segMap);

        DataShareService.saveSegmentMap( deleteIds, segmentMap, function(res) {
            console.log(res);
            $scope.segmentsSavingSpinner = false;
        });
*/
    };


    //////////// Form minimize/maximize button presesd
    $scope.formToggleButton = function() {
        $scope.formToggle = !$scope.formToggle;
    };

    $scope.getTagCloud = function() {

        DataShareService.getTagCloud( function(data) {

            /*
            $scope.wordCloudArray1Word = data.filter( function(elem) {
                return elem.numword == 1;
            });
            $scope.wordCloudArray2Word = data.filter( function(elem) {
                return elem.numword == 2;
            });
            $scope.switchWordCloudTable(2);
            */
            
            //console.log($scope.wordCloudNumWord);
            var maxCount, minCount;

            $scope.wordCloudArray = data;

            // Apply tag level
            for( var i=1 ; i <= 2 ; i++)
            {
                maxCount = 0; minCount = 0;
                $scope.wordCloudArray.forEach( function(elem) {
                    if(elem.numword == i) 
                    {
                        maxCount = (elem.freq > maxCount) ? elem.freq : maxCount;
                        minCount = (elem.freq < minCount) ? elem.freq : minCount;
                    }
                });
                $scope.wordCloudArray.forEach( function(elem, ind) {
                    if(elem.numword == i)
                        elem.level = (0 | (elem.freq - minCount)/(maxCount - minCount) * 5) + 1;
                });
            }

            //// There should be a better way to do this
            $scope.wordCloudArray.forEach( function(elem, ind)
            {
                elem.selected = false;
                if( elem.segment )
                {
                    elem.segmentArray = elem.segment.split(',');
                    elem.hasSegment = true;

                    $scope.addToTagsArray(elem.segmentArray, elem.numword);
                }
                else
                {
                    elem.segmentArray = [];
                    elem.hasSegment = false;
                }
				/////////// push brand and compete into segmentArray
				if(elem.brand == 1)
				{
					elem.segmentArray.push('brand');		// Just for ui add a brand segment, this will be removed before saving
					elem.hasSegment = true;					// this process is reversed before saving
                    $scope.addToTagsArray( ['brand'], elem.numword);
				}
				if(elem.compete == 1)
				{
					elem.segmentArray.push('compete');		// Just for ui add a compete segment, this will be removed before saving
					elem.hasSegment = true;					// this process is reversed before saving
                    $scope.addToTagsArray( ['compete'], elem.numword);
				}
				
            });
            $scope.applyUserInputsToKeywords();
           
//            console.log($scope.wordCloudArray);
        },
			function(err) {
				$scope.errorArray.push(err);
		});
    }; 
    
    
    // filter word cloud textbox changed
    $scope.filterWordCloudChanged = function() {

        var filterObj = {};
        //console.log($scope.filterWordCloud);
        if($scope.filterWordCloud == '')
        {
            $scope.wordCloudArray.forEach( function(elem) {
                elem.selected = false;
            });
        }
        else
        {
            $scope.wordCloudArray.forEach( function(elem) {
                elem.selected = false;
            });

            /*
            $scope.filteredWords.forEach( function(elem) {
                elem.selected = true;
            });
            */

            if($scope.showAllTags){
                filterObj = {word: $scope.filterWordCloud, numword: $scope.wordCloudNumWord};
            } else {
                //// IMPORTANT hasSegment: false filter is there to prevent two segments to one tag, so that hidden words do not accidently get a tag
                filterObj = {word: $scope.filterWordCloud, numword: $scope.wordCloudNumWord, hasSegment: false};
            };
            $filter('filter')($scope.wordCloudArray, filterObj, false).forEach( function(elem) {
                elem.selected = true;
            });
        }
		$scope.countSelectedWordCloud();
        //console.log($scope.filteredWords);
    };

    // user clicked on word in word cloud (todo: better name)
    $scope.wordCloudWordClicked = function(word) {

        $scope.wordCloudArray.forEach( function(elem) {
            if(elem.word === word) elem.selected = !elem.selected; 
            if(elem.selected) {
                //console.log(elem);
                if(elem.stopword)
                {
                    $scope.userInput.type = 'stopword';
                    $scope.userInput.segment = '';
                } else if (elem.negativeword)
                {
                    //$scope.userInput.type = 'negativeword';     //radio
                    $scope.userInput.type = true;     //checkbox
                    $scope.userInput.segment = '';
                } else 
                {
                    //$scope.userInput.stopword = elem.stopword;
                    //$scope.userInput.negativeword = elem.negativeword;
                    $scope.userInput.type = false;
                    $scope.userInput.segment = elem.segment;
                }
            }
        } );
		$scope.countSelectedWordCloud();
    };

    // user deleted tag from word cloud
    $scope.deleteTag = function(word, tag) {
        console.log(word + " :: " + tag);

        $scope.wordCloudArray.forEach( function(e, i)
        {
            if(e.word === word || e.selected == true)
            {
                var index = e.segmentArray.indexOf(tag);
                if (index > -1) {
                    e.segmentArray.splice(index, 1);
                    e.segment = e.segmentArray.toString();
                }
                if(e.segmentArray.length <= 0) e.hasSegment = false;
                e.selected = false;
            }
        /*
            if(e.selected == true)
            {
                var index = e.segmentArray.indexOf(tag);
                if (index > -1) {
                    e.segmentArray.splice(index, 1);
                }
                if(e.segmentArray.length <= 0) e.hasSegment = false;
                e.selected = false;
            }
            */

        });
        $scope.applyUserInputsToKeywords();
        $scope.userSegmentsSaved = false;
//        $scope.updateKeywordTable();
    };

    $scope.resetWordCloudForm = function() {
        $scope.userInput = {};
        $scope.userInput.type = false;
        $scope.userInput.segment = '';
        $scope.filterWordCloud = '';
        $scope.wordCloudArray.forEach( function(e) {
            e.selected = false;
        });
		$scope.selectedWordCloud = 0;
    };

    // Apply user inputs to all SELECTED WORDS
    $scope.applyUserInputsToTags = function() 
    {
        var temp = [];
		var isBrandFlag = false; 
		var isCompeteFlag = false;
		
        /*
        if($scope.userInput.type)
        {
            */
            /*
            if($scope.userInput.type == 'stopword')
            {
                $scope.wordCloudArray.forEach( function(elem) {
                    if(elem.selected) {
                        elem.stopword = true;
                        elem.negativeword = false;
                        elem.segment = [];
                        elem.hasSegment = false;
                    }
                });
            }
            else        // <--- can only be negativeword of stopword
            */
            if($scope.userInput.type == true)       // ie negative word checkbox checked
            {
                $scope.wordCloudArray.forEach( function(elem) {
                    if(elem.selected) {
                        //elem.stopword = false;
                        elem.negativeword = true;
                        //elem.segment = [];
                        //elem.hasSegment = false;
                        $scope.userSegmentsSaved = false;
                    }
                });
            }
            if($scope.userInput.type == false)       // ie negative word checkbox un checked
            {
                $scope.wordCloudArray.forEach( function(elem) {
                    if(elem.selected) {
                        //elem.stopword = false;
                        elem.negativeword = false;
                        //elem.segment = [];
                        //elem.hasSegment = false;
                        $scope.userSegmentsSaved = false;
                    }
                });
            }
        /*
        }
        */

        if($scope.userInput.segment)           // <-- user inputted something
        {
            $scope.wordCloudArray.forEach( function(elem) {
                if(elem.selected) {
                    //elem.stopword = false;
                    //elem.negativeword = false;
                    //if(elem.segment) temp = elem.segment.split(',');
                    if(elem.segmentArray) temp = elem.segmentArray;
                    temp.push.apply( temp, $scope.userInput.segment.split(',') );       // merge two arrays
                    // Remove duplicates
                    temp = temp.filter(function(elem, pos) {
                        return temp.indexOf(elem) === pos;
                    });
					
					elem.segmentArray = temp;     // so no duplicate segments
                    elem.hasSegment = true;
					
					isBrandFlag = false;
					$scope.brandTerms.forEach( function(e1){
						if(elem.segmentArray.indexOf( e1 ) > -1)
						{
							elem.brand = true;
							//elem.segmentArray.splice( elem.segment.indexOf( e1 ), 1);
							isBrandFlag = true;
						}
						else{ elem.brand = isBrandFlag; } 		// in actualData it is userInput.isBrand; in wordCloud data it is brand
					});
					isCompeteFlag = false;
					$scope.competeTerms.forEach( function(e1){
						if(elem.segmentArray.indexOf( e1 ) > -1)
						{
							elem.compete = true;
							//elem.segmentArray.splice( elem.segment.indexOf( e1 ), 1);
							isCompeteFlag = true;
						}
						else{ elem.compete = isCompeteFlag; } 		// in actualData it is userInput.isCompte; in wordCloud data it is compete
					});
					elem.segment = elem.segmentArray.toString();
                    $scope.addToTagsArray(temp);
                    $scope.userSegmentsSaved = false;
				}
            });
        }
//        console.log($scope.wordCloudArray);
        $scope.applyUserInputsToKeywords();
        $scope.filterWordCloud = '';
        $scope.userInput.segment = '';
        $scope.filterWordCloudChanged();
    };

    // Apply user inputs to all ALL KEYWORDS
    $scope.applyUserInputsToKeywords = function() 
    {
        var sec = new Date().getTime(); 
		var isBrandFlag = false; 
		var isCompeteFlag = false;
//        $scope.currentPageKeywords.forEach( function(e, i) {
        $scope.actualData.forEach( function(e, i) {
            
            e.userInput.stopword = false;
            e.userInput.negativeword = false;
            e.userInput.hasSegment = false;
            e.userInput.segment = [];           
			e.userInput.isBrand = false;
			e.userInput.isCompete = false;
            e.segmentToString = '';

            $scope.wordCloudArray.forEach( function(elem, ind) {

                if(elem.negativeword) {
                    if( new RegExp('\\b' + elem.word + '\\b', 'i').test(e.keyword) ) {
                        //e.userInput.stopword = false;
                        e.userInput.negativeword = true;
                        //e.userInput.hasSegment = false;
                        //e.userInput.segment = [];                       
                    }
                }
                /*
                if (elem.stopword) {
                    if( new RegExp('\\b' + elem.word + '\\b', 'i').test(e.keyword) ) {
                        e.userInput.stopword = true;
                        e.userInput.negativeword = false;
                        e.userInput.hasSegment = false;
                        e.userInput.segment = [];                       
                    }
                }
                */
                if (elem.hasSegment) {
                    if( new RegExp('\\b' + elem.word + '\\b', 'i').test(e.keyword) ) {
                        //e.userInput.stopword = false;
                        e.userInput.hasSegment = true;
                        //e.userInput.segment = elem.segment;
                        e.userInput.segment.push.apply( e.userInput.segment, elem.segmentArray );       // merge two arrays
                        e.userInput.segment = e.userInput.segment.filter(function(e1, pos) {        // remove dupes
                            return e.userInput.segment.indexOf(e1) === pos;
                        });
						e.userInput.segment.sort();         // sort segments alphabetically

						isBrandFlag = e.userInput.isBrand;
						$scope.brandTerms.forEach( function(e1) {
							if(e.userInput.segment.indexOf( e1 ) > -1)
							{
								e.userInput.isBrand = true;
								e.userInput.segment.splice( e.userInput.segment.indexOf( e1 ), 1);
								isBrandFlag = true;
							}
							else { e.userInput.isBrand = isBrandFlag; }
						});
						
						isCompeteFlag = e.userInput.isCompete;
						$scope.competeTerms.forEach( function(e1) {
							if(e.userInput.segment.indexOf( e1 ) > -1)
							{
								e.userInput.isCompete = true;
								e.userInput.segment.splice( e.userInput.segment.indexOf( e1 ), 1);
								isCompeteFlag = true;
							}
							else { e.userInput.isCompete = isCompeteFlag; }
						});
						////////// TODO: If tags are comming directly from db not from UI there would be extra condition here
						
						e.segmentToString = e.userInput.segment.toString();
                        e.userInput.negativeword = false;
                    }
                }
            });
            

        });
        console.log( new Date().getTime() - sec );
    };

    // Delete negative words form both tag clouds and keyword list
    $scope.deleteNegativeWordsLocal = function() {

        $scope.actualData = $scope.actualData.filter( function(elem, ind)
        {
            if(elem.userInput.negativeword)
            {
                $scope.idsToBeDeleted.push(elem.id);       
                return false;       // ie delete the keyword from the front end
            }
            else return true;
        });

        $scope.wordCloudArray = $scope.wordCloudArray.filter( function(elem, ind)
        {
            if(elem.negativeword)
            {
                return false;       // ie delete the tag from the front end
            }
            else return true;
        });
        $scope.filterWordCloud = '';
        $scope.updateKeywordTable();
        $scope.userSegmentsSaved = false;
    };


    // User clicked input element 
    $scope.userInputFormClicked = function() {
       $scope.userInput.type = false;
    };

    // Sort by table header
    $scope.sort_by = function(sortField) {

        var sortObj = {};
        var sortOrder;
		var fieldName;
        $scope.trackSort.track.forEach( function(elem, ind) {
            if(elem.field === sortField)
            {
                elem.desc = !elem.desc;
                sortObj = elem;
            }
        });

        $scope.trackSort.sortOn = sortObj;

        console.log(sortField);      
        console.log(sortObj);

        //if(sortObj.field != 'DELETE')
		if( !(['BRAND', 'COMPETE', 'DELETE'].indexOf(sortObj.field) > -1) )
        {
            //$scope.actualData.sort( dynamicSort(sortObj.field) );
            $scope.actualData.sort( dynamicSort( ((sortObj.desc) ? '' : '-' ) + sortObj.field ) );
        }
        else
        {
			if(sortObj.field == "COMPETE") fieldName = "isCompete";
			if(sortObj.field == "BRAND") fieldName = "isBrand";
			if(sortObj.field == "DELETE") fieldName = "negativeword";
			
            $scope.actualData.sort( function(a, b) {

                sortOrder = sortObj.desc ? 1 : -1;
                return (a.userInput[fieldName] - b.userInput[fieldName]) * sortOrder;

                //return (a.userInput.negativeword === b.userInput.negativeword)? 0 : a.userInput.negativeword? -1 : 1; 
/*
                if (a.userInput.negativeword > b.userInput.negativeword)
                    return sortObj ? 1 : -1;
                if (a.userInput.negativeword < b.userInput.negativeword)
                    return sortObj ? 1 : -1;
                return 0;
                */

            });
        }

        $scope.currentTopRow = 0;
        $scope.updateKeywordTable();

        function dynamicSort(property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        };

    };
    
    /////// user clicked on wordcloud word->tag
    $scope.selectAllTaggedWords = function(tag) {
        console.log(tag)
        $scope.wordCloudArray.forEach( function(e) {
            if(e.segmentArray.indexOf(tag) > -1) e.selected = !e.selected;
            else e.selected = false;
        });
    };

    /////////// Add to MASTER tagsArray
    $scope.addToTagsArray = function(newTags, numWord) {

        var numWord = numWord || $scope.wordCloudNumWord;

        if(numWord == 1) {
            $scope.tagsArray1Word.push.apply( $scope.tagsArray1Word, newTags );       // merge two arrays
            $scope.tagsArray1Word = $scope.tagsArray1Word.filter(function(elem, pos) {
                return $scope.tagsArray1Word.indexOf(elem) === pos;
            });
        }

        if(numWord == 2) {
            $scope.tagsArray2Word.push.apply( $scope.tagsArray2Word, newTags );       // merge two arrays
            $scope.tagsArray2Word = $scope.tagsArray2Word.filter(function(elem, pos) {
                return $scope.tagsArray2Word.indexOf(elem) === pos;
            });
        }
    };

    // Delete Master tag
    $scope.deleteMasterTag = function(tag, numWord) {

        var numWord = numWord || $scope.wordCloudNumWord;

        if(numWord == 1)
        {
            $scope.tagsArray1Word.splice( $scope.tagsArray1Word.indexOf(tag), 1 );
        }
        if(numWord == 2)
		{
			$scope.tagsArray2Word.splice( $scope.tagsArray2Word.indexOf(tag), 1 );
        }

        $scope.wordCloudArray.forEach( function(e, i)
        {
            if(e.numword == numWord)
            {
                var index = e.segmentArray.indexOf(tag);
                if (index > -1) {
                    e.segmentArray.splice(index, 1);
					e.segment = e.segmentArray.toString();
					if($scope.brandTerms.indexOf(tag) > -1)	e.brand = false;
					if($scope.competeTerms.indexOf(tag) > -1)	e.compete = false;
                }
                if(e.segmentArray.length <= 0) e.hasSegment = false;
            }
        });
        $scope.applyUserInputsToKeywords();
		$scope.userSegmentsSaved = false;
    };

    // Master tag clicked
    $scope.masterTagClicked = function(tag, numWord) {

        var numWord = numWord || $scope.wordCloudNumWord;

        $scope.wordCloudArray.forEach( function(e, i)
        {
            if(e.numword == numWord)
            {
                var index = e.segmentArray.indexOf(tag);
                if (index > -1) {
                    e.selected = !e.selected;
                }
            }
        });
    };

    /////////////////////////////////////////////////////////////////////////////////////////
    ////// Show relevant popover form for tag cloud
    $scope.showPopoverForm = function(popoverData) {

        console.log(popoverData);
        if(popoverData.data) {
            if(popoverData.data.segment) {
                // apply segment
                console.log("Applying");
                $scope.applyUserSegmentsPopover(popoverData.word, popoverData.data.segment);
            } else if(popoverData.data.stopword) {
                // apply stopword
            } else if(popoverData.data.negativeword) {
                // apply negative word
            }
        }
    };

    $scope.applyUserSegmentsPopover = function(keyword, userSegment)
    {
        var key, tempArray = [];
        $scope.dummyData.forEach(function(elem, ind) {
            if(new RegExp('\\b' + keyword + '\\b', 'i').test(elem.keyword)) {    // returns true or false

                elem.userInputSegmentArray[keyword] = userSegment.split(',');

                elem.userInputSegment = '';
                for(key in elem.userInputSegmentArray) {
                    //console.log(elem.userInputSegmentArray[key].join());
                    if(elem.userInputSegmentArray[key].join().length) {
                        elem.userInputSegment = elem.userInputSegment + ", " + elem.userInputSegmentArray[key].join();
//                    console.log(elem.userInputSegmentArray[key].join(", "));
                    }
                }
                elem.userInputSegment = elem.userInputSegment.substring(2, elem.userInputSegment.length);
//                  console.log(elem.userInputSegment);
                //elem.userInputSegment = elem.userInputSegmentArray.map( function(element, index) {
                //};
                //console.log(elem);
            }
        });
		countMatchedKeywords();

    };

    //////////////////////////////////////////////////////////////////////////////////////// 

    // Update Landing page scores 
    $scope.updateLandingPageScores = function() {

        var landingPageWordCloud = [];
        var landingPageWordCloudTagsArray = [];

        DataShareService.ops.getLandingPageWordCloud({id: $scope.selectedLandingPageUrl.id}, function (res) {

            landingPageWordCloud = res;
            res.forEach( function (e) {
                landingPageWordCloudTagsArray.push(e.word);
            });

			$scope.actualData.forEach( function(elem) {
				elem.landingPageKeywordScore = calcLPScore(elem.keyword);
			});

        });
        
       //console.log($scope.actualData);
        $scope.updateKeywordTable();

        // private function 
        function calcLPScore(keyword) {
            var keywordArray = keyword.split(" ");

            var matched = keywordArray.filter(function(n) {
                return landingPageWordCloudTagsArray.indexOf(n) != -1;
            });

            return matched.length/keywordArray.length;
            //return Math.random();
        };

    };

	// count number of selected word cloud words
	$scope.countSelectedWordCloud = function() {
	
		$scope.selectedWordCloud = $filter('filter')($scope.wordCloudArray, {selected: true}, false).length
			/*
		$scope.selectedWordCloud = $scope.wordCloudArray.filter( function(elem) {
			return elem.selected;
		}).length; */
	};

    //////////////////////////// End Handle Stop Words Interface ///////////////////
    

	// Init
    $scope.resetWordCloudForm();
    $scope.selectedDataAccount = DataShareService.getSelectedDataAccount();
    //console.log($scope.selectedDataAccount);
    if($scope.selectedDataAccount.id >= 0)      // since id must be >= 0
    {
		ngProgress.start();
        /*
		DataShareService.getKeywordCount( function(data) {
			data.count = (data.count > 5000) ? 5000 : data.count;
			$scope.numShowKeywords = data.count;
			$scope.updateKeywordTable();
		});
        */

        DataShareService.fetchAllKeywords(function(data) {
            // we are fetching whole data set now
            $scope.actualData = data;
			$scope.updateKeywordTable();
        },
			function(err) {
				$scope.errorArray.push(err);
		});
        
        $scope.getTagCloud();
		ngProgress.complete();
		
		$('#myModal').on('shown.bs.modal', function() {
			$(document).off('focusin.modal');
		});
        /*
        $scope.phrasesLoadingSpinner = true;
        DataShareService.refreshPhrases( function(res) {
            // get 2 word phrases
            DataShareService.fetchAllPhrases(2, function(data) {
                $scope.actualDataPhrases = data;
                $scope.updatePhrasesTable();
                $scope.bulkApplyUserSegments();
                $scope.phrasesLoadingSpinner = false;
                console.log("2 Word");
            });
            // get 1 word phrases
            DataShareService.fetchAllPhrases(1, function(data) {
                $scope.actualDataPhrases1Word = data;
                $scope.updatePhrasesTable1Word();
                $scope.bulkApplyUserSegments1Word();
                $scope.phrasesLoadingSpinner1Word = false;
                console.log("1 Word");
            });
        });
        */
    }
	



}]);
