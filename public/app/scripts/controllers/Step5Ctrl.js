'use strict';

keywordSegmentsControllers.controller('Step5Ctrl', ['$scope', '$http', '$filter', 'DataShareService', function ($scope, $http, $filter, DataShareService) {
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

    $scope.trackSort = { sortOn: {field: 'id', desc: false}, track: [{field: 'keyword', desc: true}, {field: 'segmentToString', desc: true},{field: 'avMonthlySearches', desc: true}] };

     $scope.wordCloudArray = [];   

    $scope.segmentsSavingSpinner = false;

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
        console.log("Table Updated")
        console.log($scope.currentTopRow + " :: " + $scope.numShowKeywords);
//        $scope.applyUserInputsToKeywords();

        if( $scope.actualData.length > Number($scope.currentTopRow) + Number($scope.numShowKeywords) ) {
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

    // Handle manula stopWordMatch check box toggle 
/*
    $scope.negativeKeyowrdCheckBoxToggle = function(keyword) {
        $scope.actualData.forEach( function(element, index){
            if(element.Keyword === keyword) {
                element.negativeKeywordMatch = !element.negativeKeywordMatch; 
                console.log(element);
            }
        });
        countMatchedKeywords();
    };
*/

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
    // save button pressed
    $scope.saveInputSegments = function() {
        $scope.phrasesSavingSpinner = true;
        console.log($scope.phrasesSavingSpinner);
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


    $scope.switchInputTable = function(phraseLength) {
        
        if(phraseLength == 1) 
        {
            console.log("Phrase Length :: " + phraseLength);
            $scope.showPhrases1WordTable = true;
        }
        if(phraseLength == 2) 
        {
            console.log("Phrase Length :: " + phraseLength);
            $scope.showPhrases1WordTable = false;
        }
           
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

    // Save button pressed
    $scope.saveButtonPressed = function()
    {
        $scope.segmentsSavingSpinner = true;

        var deleteIds = [];
        var segmentMap = [];
        $scope.actualData.forEach( function(keyword) {
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
    };


    $scope.getTagCloud = function() {

        DataShareService.getTagCloud( function(data) {
            var maxCount, minCount;
            maxCount = 0; minCount = 0;

            var word = Object.keys(data), 
                len = word.length,
                i = 0,
                prop,
                count;

            while (i < len) {
                prop = word[i];
                count = data[prop];
                i += 1;
                if( !((prop == "$promise")||(prop == "$resolved")) )
                {
                    $scope.wordCloudArray.push({word: prop, count: count});
                    maxCount = (count > maxCount) ? count : maxCount;
                    minCount = (count < minCount) ? count : minCount;
                }
            }
            $scope.wordCloudArray.forEach( function(elem, ind) {
                elem.level = (0 | (elem.count - minCount)/(maxCount - minCount) * 5) + 1;
                //// There should be a better way to do this
                elem.selected = false;
                elem.negativeword = false;
                elem.stopword = false;
                elem.segment = []; 
                elem.hasSegment = false;
            });
            console.log($scope.wordCloudArray);
        });
    };
    
    // filter word cloud textbox changed
    $scope.filterWordCloudChanged = function() {

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

            $filter('filter')($scope.wordCloudArray, $scope.filterWordCloud, false).forEach( function(elem) {
                elem.selected = true;
            });
        }
        //console.log($scope.filteredWords);
    };

    // user clicked on word in word cloud (todo: better name)
    $scope.wordCloudWordClicked = function(word) {

        $scope.wordCloudArray.forEach( function(elem) {
            if(elem.word === word) elem.selected = !elem.selected; 
            if(elem.selected) {
                console.log(elem);
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
                    $scope.userInput.segment = elem.segment.toString();
                }
            }
        } );
    };

    // user deleted tag from word cloud
    $scope.deleteTag = function(word, tag) {
//        console.log(word + " :: " + tag);
        $scope.wordCloudArray.forEach( function(e, i)
        {
            if(e.word === word)
            {
                var index = e.segment.indexOf(tag);
                if (index > -1) {
                    e.segment.splice(index, 1);
                }
                if(e.segment.length <= 0) e.hasSegment = false;
                 console.log(e);                   
            }
        });

        $scope.applyUserInputsToKeywords();
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
    };

    // Apply user inputs to all SELECTED WORDS
    $scope.applyUserInputsToTags = function() 
    {
        var temp = [];

        console.log($scope.userInput);

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
            if($scope.userInput.type == true)       /// ie negative word checkbox checked
            {
                $scope.wordCloudArray.forEach( function(elem) {
                    if(elem.selected) {
                        //elem.stopword = false;
                        elem.negativeword = true;
                        //elem.segment = [];
                        //elem.hasSegment = false;
                    }
                });
            }
            if($scope.userInput.type == false)       /// ie negative word checkbox checked
            {
                $scope.wordCloudArray.forEach( function(elem) {
                    if(elem.selected) {
                        //elem.stopword = false;
                        elem.negativeword = false;
                        //elem.segment = [];
                        //elem.hasSegment = false;
                    }
                });
            }
/*
        }
        */
        if($scope.userInput.segment)           /// <-- user inputted something
        {
            $scope.wordCloudArray.forEach( function(elem) {
                if(elem.selected) {
                    //elem.stopword = false;
                    //elem.negativeword = false;
                    //if(elem.segment) temp = elem.segment.split(',');
                    if(elem.segment) temp = elem.segment;
                    temp.push.apply( temp, $scope.userInput.segment.split(',') );       // merge two arrays
                    // Remove duplicates
                    temp = temp.filter(function(elem, pos) {
                        return temp.indexOf(elem) === pos;
                    });
                    elem.segment = temp;     // so no duplicate segments
//                    elem.segment = temp.toString();     // so no duplicate segments
                    elem.hasSegment = true;
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
//        $scope.currentPageKeywords.forEach( function(e, i) {
        $scope.actualData.forEach( function(e, i) {
            
            e.userInput.stopword = false;
            e.userInput.negativeword = false;
            e.userInput.hasSegment = false;
            e.userInput.segment = [];                       
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
                        e.userInput.segment.push.apply( e.userInput.segment, elem.segment);       // merge two arrays
                        e.userInput.segment = e.userInput.segment.filter(function(e1, pos) {        // remove dupes
                            return e.userInput.segment.indexOf(e1) === pos;
                        });
                        e.segmentToString = e.userInput.segment.toString();
                        //e.userInput.negativeword = false;
                    }
                }

            });
        });
        console.log( new Date().getTime() - sec );
    };

    // Delete negative words form both tag clouds and keyword list
    $scope.deleteNegativeWordsLocal = function() {

        $scope.wordCloudArray = $scope.wordCloudArray.filter( function(elem) {
            if(elem.selected) {
                $scope.actualData = $scope.actualData.filter( function(e) {
                     return !(new RegExp('\\b' + elem.word + '\\b', 'i').test(e.keyword));
                });
                return false;   // delete the word also
            } else return true;
        });
        $scope.filterWordCloud = '';
        console.log('Here');

    };


    // User clicked input element 
    $scope.userInputFormClicked = function() {
       $scope.userInput.type = false;
    };

    // Sort by table header
    $scope.sort_by = function(sortField) {

        var sortObj = {};


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

        //$scope.actualData.sort( dynamicSort(sortObj.field) );
        $scope.actualData.sort( dynamicSort( ((sortObj.desc) ? '' : '-' ) + sortObj.field ) );

        console.log( ((sortObj.desc) ? '' : '-' ) + sortObj.field );
        console.log( $scope.actualData );

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

    //////////////////////////// End Handle Stop Words Interface ///////////////////
    

	// Init
    $scope.resetWordCloudForm();
    $scope.selectedDataAccount = DataShareService.getSelectedDataAccount();
    console.log($scope.selectedDataAccount);
    if($scope.selectedDataAccount.id >= 0)      // since id must be >= 0
    {

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
        });
        
        $scope.getTagCloud();

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
