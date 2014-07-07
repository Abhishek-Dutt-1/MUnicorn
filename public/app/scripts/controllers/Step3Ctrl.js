'use strict';

keywordSegmentsControllers.controller('Step3Ctrl', ['$scope', '$http', 'DataShareService', function ($scope, $http, DataShareService) {
    $scope.numShowKeywords = 50;
    $scope.currentPageNum = 0;
    $scope.currentKeywordsMatched = 0;
	$scope.countArray = []
    $scope.countArraySorted = [];
    $scope.numShowKeywordsSortedArray = 50;
    $scope.currentPageNumSortedArray = 0;

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
    //////////////////////////// End Keywords Table and Pager /////////////////////////
    
    // Mark matches between keywords and Negative Keyword List
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

    // Reset button pressed
    $scope.resetMatches = function() {
        $scope.actualData.forEach( function(elem, index){
            elem.userInputSegmentArray = [];
            elem.userInputSegment = '';
        });
        //$scope.updateKeywordTable();
        $scope.countArraySorted.forEach( function(elem, index){
            elem.userInputSegment = '';
        });
    };

    // Delete matches
    $scope.deleteMatches = function() {
        $scope.actualData = $scope.actualData.filter( function(element, index) {
			return !element.negativeKeywordMatch;
        });
		DataShareService.updateActualData($scope.actualData);
        $scope.updateKeywordTable();
        countMatchedKeywords();
    };

    // Handle manula stopWordMatch check box toggle 
           
    $scope.negativeKeyowrdCheckBoxToggle = function(keyword) {
        $scope.actualData.forEach( function(element, index){
            if(element.Keyword === keyword) {
                element.negativeKeywordMatch = !element.negativeKeywordMatch; 
                console.log(element);
            }
        });
        countMatchedKeywords();
    };

    // Maintain a count of keywords currently matched (local function);
    var countMatchedKeywords = function() {
        $scope.currentKeywordsMatched = 0; 
        $scope.actualData.forEach( function(element, index) {
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

    // local function to sort keyword count sudo assoc array
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

    // Updates pager(at the bottom of the table) on initial load and on change of numShowKeywords
    $scope.changePageSortedArray = function(next) {
        if(next >= 0) {
            $scope.currentPageNumSortedArray = ($scope.countArraySorted.length > ($scope.currentPageNumSortedArray+1)*$scope.numShowKeywordsSortedArray) ? $scope.currentPageNumSortedArray + 1 : $scope.currentPageNumSortedArray;
        } else {
            $scope.currentPageNumSortedArray = ($scope.currentPageNumSortedArray === 0)? 0 : $scope.currentPageNumSortedArray - 1;
        }
        $scope.updateKeywordTableSortedArray();
    };

    // Updates keywordstable on initial load and on change of numShowKeywords
    $scope.updateKeywordTableSortedArray = function() {
        // Calculate Keywords to show
        // First page is currentPageNum = 0
        var startIndex = 0;
        if( Number( $scope.currentPageNumSortedArray * $scope.numShowKeywordsSortedArray ) < Number($scope.countArraySorted.length) ) {
            startIndex = Number( $scope.currentPageNumSortedArray * $scope.numShowKeywordsSortedArray );
        } else {
            // Changed startIndex is too high set it to 0 and start page also
            // to 0
            startIndex = 0;
            $scope.currentPageNumSortedArray = 0;
        }
        var endIndex = Number( (Number(startIndex) + Number($scope.numShowKeywordsSortedArray) < Number($scope.countArraySorted.length)) ? Number(startIndex) + Number($scope.numShowKeywordsSortedArray) : $scope.actualData.length );
        $scope.dummyDataSortedArray = $scope.countArraySorted.slice(startIndex, endIndex);
        //console.log($scope.dummyDataSortedArray);
    };

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
    //////////////////////////// End Handle Stop Words Interface ///////////////////
	
	// Init
	DataShareService.fetchActualData( function(data) {
		$scope.actualData = data;
		$scope.dummyData = $scope.actualData;
		$scope.updateKeywordTable();
		$scope.keywordCount();
		$scope.updateKeywordTableSortedArray();
	});
	
}]);
