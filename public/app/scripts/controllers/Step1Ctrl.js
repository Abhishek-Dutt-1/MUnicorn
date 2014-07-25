'use strict';

keywordSegmentsControllers.controller('Step1Ctrl', ['$scope', '$sce', 'DataShareService', function ($scope, $sce, DataShareService) {
    $scope.numShowKeywords = 10;
    $scope.currentPageNum = 0;      // 0 == first page
    $scope.currentKeywordsMatched = 0;
    $scope.doNotDelete = [-1];	
    $scope.matchButtonPressed = false;
    $scope.selectedDataAccount = {};

    $scope.totalDataRowsCount = 0;
    $scope.currentTopRow = 1;
    $scope.keywordLastPage = false;
    $scope.keywordFirstPage = true;

    $scope.trackSort = { sortOn: {field: 'id', desc: false}, track: [{field: 'keyword', desc: true}, {field: 'avMonthlySearches', desc: true}] };

	/*
	// Fetch Keywords, expects JSON
	$http.get('scripts/Dish Tv Sample.json').success(function(data) {
		$scope.actualData = angular.fromJson(data);
		$scope.dummyData = $scope.actualData;
        $scope.updateKeywordTable();
	});
	*/
	
    //////////////////////////// Keywords Table and Pager /////////////////////////
    // Updates pager(at the bottom of the table) on initial load and on change of numShowKeywords
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
            //console.log($scope.keywordLastPage);
            // update pager
            if( $scope.currentTopRow > 1 ) {
                $scope.keywordFirstPage = false;
            } else {
                $scope.keywordFirstPage = true;
            }

            if($scope.matchButtonPressed) $scope.markMatches();

        } );


    };
/*   
    $scope.changePage = function(next) {
        if(next >= 0) {
            $scope.currentPageNum = ($scope.actualData.length > ($scope.currentPageNum+1)*$scope.numShowKeywords) ? $scope.currentPageNum + 1 : $scope.currentPageNum;
        } else {
            $scope.currentPageNum = ($scope.currentPageNum === 0)? 0 : $scope.currentPageNum - 1;
        }
        $scope.updateKeywordTable();
    };
*/
/*
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
    $scope.markButton = function() {

        $scope.matchButtonPressed = !$scope.matchButtonPressed;
        if($scope.matchButtonPressed) $scope.markMatches();
        else $scope.resetMatches();
        console.log($scope.matchButtonPressed);
        /*
        $scope.matchButtonPressed = true;
        $scope.markMatches();
        */
    };
    // Mark matches between keywords and Stop Word List
    $scope.markMatches = function() {

        $scope.dummyData.forEach( function(currentValue, index, array) {

            if(typeof $scope.stopWordList !== 'undefined')             // Mark all false if stopWordsList does not exists
            {

                if($scope.stopWordList.length > 0)               // Exist and has at least one element
                {

                    $scope.stopWordList.forEach( function(stopWord, index, array)           //  .some returns true for matches at least one match
                    {
                        if($scope.doNotDelete.indexOf(currentValue.id) === -1)
                        {
                            if( new RegExp('\\b' + stopWord.stopword + '\\b', 'i').test( currentValue.keyword )  === true )                // returns true of false
                            {

                                if(currentValue.stopWordMatch === true)          // current keyword has already been matched atleast once.
                                {
                                    currentValue.KeywordStopWordHighlighted = currentValue.KeywordStopWordHighlighted.replace(new RegExp('\\b' + stopWord.stopword + '\\b', 'ig'), '<mark><b>$&</b></mark>');
                                }
                                else
                                {
                                    currentValue.KeywordStopWordHighlighted = currentValue.keyword.replace( new RegExp('\\b' + stopWord.stopword + '\\b', 'ig') , '<mark><b>$&</b></mark>' );
                                    //console.log(currentValue.KeywordStopWordHighlighted);
                                    currentValue.stopWordMatch = true;                      // atleast one match found in the stop word list for current keyword
                                }
                            }
                            else
                            {
                            }
                        }
                        else
                        {
                        }
                    });
                }
                else
                {
                }
            }
            else
            {
            }
        });
        countMatchedKeywords();
    };

/*
    $scope.markMatches = function() {
       //actualData vs StopWordList Matching Code Here 
        $scope.actualData = $scope.actualData.map( function(currentValue, index, array) {   // Map returns a new array leaving orginal array untouched

            if(typeof $scope.stopWordList !== 'undefined') {       // Mark all false if stopWordsList does not exists

                if($scope.stopWordList.length > 0) {               // Exist and has at least one element

                    $scope.stopWordList.forEach( function(stopWord, index, array) {    //  .some returns true for matches at least one match

                        //console.log(stopWord + ' :: ' + currentValue.keyword + ' :: ' + new RegExp('\\b' + stopWord + '\\b', 'ig').test(currentValue.keyword) );
                        if( new RegExp('\\b' + stopWord + '\\b', 'i').test( currentValue.keyword )  === true )                // returns true of false
                        {
                            if(currentValue.stopWordMatch === true) {          // current keyword has already been matched atleast once.

                                currentValue.KeywordStopWordHighlighted = currentValue.KeywordStopWordHighlighted.replace(new RegExp('\\b' + stopWord + '\\b', 'ig'), '<mark><b>$&</b></mark>');

                            } else {

                                currentValue.KeywordStopWordHighlighted = currentValue.keyword.replace( new RegExp('\\b' + stopWord + '\\b', 'ig') , '<mark><b>$&</b></mark>' );

                                //console.log(currentValue.KeywordStopWordHighlighted);
                                currentValue.stopWordMatch = true;                      // atleast one match found in the stop word list for current keyword
                            }
                        }
                        else {
                            //currentValue.stopWordMatch = false;
                        }
                    });
                    return currentValue;
                } else {
                    //currentValue.stopWordMatch = false;                         // No element in stopWordsList
                    return currentValue;
                }
            } else {
                //currentValue.stopWordMatch = false;                             // stopWOrdsList not defined
                return currentValue;
            }
        });
        countMatchedKeywords();
    };
*/
    // small hack to display KeywordStopWordHighlighted string as html
    $scope.renderHtml = function(html_code)
    {
        return $sce.trustAsHtml(html_code);
    };

    // Reset button pressed
    $scope.resetMatches = function() {
        $scope.dummyData.forEach( function(element, index){
            element.KeywordStopWordHighlighted = element.keyword;
            element.stopWordMatch = false; 
        });
        $scope.doNotDelete = [];
        $scope.matchButtonPressed = false;
        countMatchedKeywords();
    };

    // Delete stop word matches within the keyword, no element is deleted, only
    // keword is altered
    $scope.deleteMatches = function() {
        console.log($scope.doNotDelete);

        if($scope.matchButtonPressed) {         // only delete if Match button is pressed
            DataShareService.deleteMatchingStopWordsFromKeywords($scope.doNotDelete.toString(), function(res) { 
                $scope.updateKeywordTable();
            } );
        }
        $scope.matchButtonPressed = false;
        
        countMatchedKeywords();
    };
/*
    $scope.deleteMatches = function() {
        $scope.actualData.forEach( function(element, index) {
            if(element.stopWordMatch == true) {
                element.keyword = element.KeywordStopWordHighlighted.replace(new RegExp('<mark>(.*?)</mark>', 'ig'), "");
                element.KeywordStopWordHighlighted = element.keyword;
                element.stopWordMatch = false;
            }
        });
		DataShareService.updateActualData($scope.actualData);
        $scope.updateKeywordTable();
        countMatchedKeywords();
    };
*/

    // Handle manual stopWordMatch check box toggle 
    $scope.stopWordCheckBoxToggle = function(id) {

        $scope.dummyData.forEach( function(element, index){
            if(element.id === id) {
                if(element.stopWordMatch === true) {
                    element.stopWordMatch = !true; 
                    if( $scope.doNotDelete.indexOf(id) === -1 ) $scope.doNotDelete.push(id);
                    //DataShareService.toggleDeleteFlag( id, element.stopWordMatch, function(res) {} );
                }
                else
                {
                    element.stopWordMatch = true; 
                    if( $scope.doNotDelete.indexOf(id) !== -1 ) $scope.doNotDelete.splice( $scope.doNotDelete.indexOf(id), 1 );
                }
            }
        });

        if($scope.matchButtonPressed) $scope.markMatches();
        console.log($scope.doNotDelete);
        countMatchedKeywords();
    };
/*
    $scope.stopWordCheckBoxToggle = function(keyword) {
        $scope.actualData.forEach( function(element, index){
            if(element.keyword === keyword) {
                element.stopWordMatch = !element.stopWordMatch; 
            }
        });
        countMatchedKeywords();
    };
*/

    // Maintain a count of keywords currently matched (local function);
    var countMatchedKeywords = function() {
/*
        $scope.currentKeywordsMatched = 0; 
        $scope.actualData.forEach( function(element, index) {
            if(element.stopWordMatch === true) {
                $scope.currentKeywordsMatched = $scope.currentKeywordsMatched + 1;
            }
        });
*/
    };

    //////////////////////////// Handle Stop Words Interface ///////////////////
	// Fetch Stop words list
	// Expects a string with new line separating individual words
	/*
	$http.get('scripts/StopWords_Step1.txt').success(function(data) {
		// Create JS array splitting at new line
		data = data.split('\r\n');
        $scope.addStopWordList(data);
	});
*/
    // Delete a Stop Word from the displayed list
    $scope.deleteStopWord = function(id) {
        //$scope.stopWordList.splice( $scope.stopWordList.indexOf(stopWord), 1 );
		//DataShareService.updateStopWordList($scope.stopWordList);
        DataShareService.destroyStopWord(id, function(res) {
            $scope.updateStopwordTable();
        });
        //$scope.updateStopwordTable();
    };

/*
    $scope.deleteStopWord = function(stopWord) {
        $scope.stopWordList.splice( $scope.stopWordList.indexOf(stopWord), 1 );
		DataShareService.updateStopWordList($scope.stopWordList);
    };
*/

    // Add formarly stop word button pressed
    // Add a new user input Stop Word to the displayed list
    $scope.addNewStopWord = function(newStopWord) {
        if(typeof newStopWord !== 'undefined') {
            // Replace multiple consicutive space with one space
            newStopWord = newStopWord.replace(/(\s)+/g, '$1');
            // Dont add only blank space input
            if(newStopWord !== '') {
				// check if it already exists
				if (!($scope.stopWordList.some( function(elem, ind) {
					return elem.stopword == newStopWord;
				}) ))
				{
					DataShareService.saveNewStopword(newStopWord, function(res) {
						$scope.newStopWord = "";
						$scope.updateStopwordTable();
					});
				} else {
					$scope.newStopWord = "";
				}
            }
        }
    };

    $scope.updateStopwordTable = function() {

        DataShareService.fetchStopWordList( function(data) {
            // Create JS array splitting at new line
            //console.log(data);
            //data = data.split('\r\n');
//            $scope.addStopWordList(data);
            $scope.stopWordList = data;
            if($scope.matchButtonPressed) { $scope.resetMatches(); $scope.matchButtonPressed = true; $scope.markMatches(); }
        });

    };
/*
    $scope.addNewStopWord = function(newStopWord) {
        if(typeof newStopWord !== 'undefined') {
            // Replace , with space
            newStopWord = newStopWord.split(',').join(' ');
            // Replace multiple consicutive space with one space
            newStopWord = newStopWord.replace(/(\s)+/g, '$1');
            // Dont add only blank space input
            if(newStopWord !== '') {
                // Split at space
                $scope.addStopWordList(newStopWord.split(' '));
				//$scope.markMatches();
				$scope.newStopWord = "";
            }
        }
    };
*/
/*
    // Add string array to StopeWordsList
    $scope.addStopWordList = function(data) {
        // Merge new array with any existing data
        
        if(typeof $scope.stopWordList !== 'undefined') {
            data = data.concat($scope.stopWordList);
        }
        // Make all words lower case
        //data = $.map(data, function(item) {
        data.forEach(function(item, index) {
            item = item.trim();
            item = item.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');        // Clean stopWord of special characters
            return item.toLowerCase();
        });
        // Remove duplicates
        data = data.filter(function(elem, pos) {
            return data.indexOf(elem) === pos;
        });
        data.sort();
        $scope.stopWordList = data;
//		DataShareService.updateStopWordList($scope.stopWordList);		
    };
*/
    /////////////////////// End Handle Stop Words Interface ///////////////////

    $scope.sort_by = function(sortField) {

//        $scope.trackSort = { sortOn: {field: 'id', desc: false}, track: [{field: 'keyword', desc: true}, {field: 'volume', desc: true}] };
        var sortObj = {};

        $scope.trackSort.track.forEach( function(elem, ind) {
            if(elem.field === sortField)
            {
                elem.desc = !elem.desc;
                sortObj = elem;
            }
        });

        $scope.currentTopRow = 1;
        $scope.trackSort.sortOn = sortObj;
        $scope.updateKeywordTable();
    };


    // INIT
//$scope.currentDataAccount = DataShareService.getSelectedDataAccount();		

    $scope.selectedDataAccount = DataShareService.getSelectedDataAccount();
    if($scope.selectedDataAccount.id >= 0)      // since id must be >= 0
    {
        $scope.updateKeywordTable();
        $scope.updateStopwordTable();
    }

/*
	DataShareService.fetchActualData( function(data) {
		data.forEach( function(elem, index) {
			elem.KeywordStopWordHighlighted = elem.keyword;
			elem.stopWordMatch = false;
		});
		$scope.actualData = data;
		$scope.dummyData = $scope.actualData;
//		$scope.updateKeywordTable();
	});
*/

/*	
	DataShareService.fetchStopWordList( function(data) {
		// Create JS array splitting at new line
		//console.log(data);
		//data = data.split('\r\n');
        $scope.addStopWordList(data);
	});
*/	
	
}]);
