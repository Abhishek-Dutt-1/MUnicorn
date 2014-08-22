'use strict';

keywordSegmentsControllers.controller('SelectDataCtrl', ['$scope', '$upload', 'DataShareService', function ($scope, $upload, DataShareService)
{
    $scope.selectedDataAccount = {};
    $scope.uploadProgress = 0;
    $scope.landingPageWordCloud = [];
    $scope.currentWordCloud = {};       // tracks which landing page Id word cloud to show in modal
    $scope.landingPageSort = 'freq';    // default for landing page word cloud sort
    $scope.reverse = true;
	$scope.dataSetAccordion = [];
	
    $scope.addNewDataAccount = function(newDataAccountName, userName) 
    {
        if(typeof newDataAccountName !== 'undefined') {
            // Replace multiple consicutive space with one space
            newDataAccountName = newDataAccountName.replace(/(\s)+/g, '$1');
            // Dont add only blank space input
            if(newDataAccountName !== '') {
                DataShareService.saveNewDataAccount(newDataAccountName, userName, function(res) {
                    $scope.newDataAccountName = "";
                    $scope.updateDataAccountsTable();
                    //console.log(res);
                });
            }
        }
    };

    $scope.deleteDataAccount = function(dataAccountId) 
    {
         DataShareService.deleteDataAccount(dataAccountId, $scope.updateDataAccountsTable);
    };

    $scope.updateDataAccountsTable = function()
    {
        DataShareService.fetchAllDataAccountNames( function(data) {
            $scope.accountNameList = data;
			
			// if something was pre selected of still exists after data refresh (i.e. was not deleted)
			var preSelected = data.filter( function(e) {
				return e.id == $scope.selectedDataAccount.id;	// <- previously selected data set
			});
			
			if(preSelected.length > 0)		// new data sets have the previously selected data set
			{
				// duplicate of the one in $scope.setSelectDataAccount 
				DataShareService.setSelectedDataAccount( preSelected[0].id, preSelected[0].dataaccount, preSelected[0].landingPageUrls, function(res) {
					$scope.selectedDataAccount.id = res.id; 
					$scope.selectedDataAccount.name = res.name;
					$scope.selectedDataAccount.landingPageUrls = res.landingPageUrls;
				} );
			}
        });
    };
    
    // data account name clicked in the View
    $scope.setSelectDataAccount = function(dataAccountId, dataAccountName, landingPageUrls) {

		// toggle if already selected
		if( DataShareService.getSelectedDataAccount().id == dataAccountId )
		{
			$scope.selectedDataAccount = DataShareService.unsetSelectedDataAccount();
			return;
		}
		DataShareService.setSelectedDataAccount( dataAccountId, dataAccountName, landingPageUrls, function(res) {
			$scope.selectedDataAccount.id = res.id; 
			$scope.selectedDataAccount.name = res.name;
			$scope.selectedDataAccount.landingPageUrls = res.landingPageUrls;
		} );
		
    };


    // File upload module functions
    $scope.onFileSelect = function($files)
    {

       $scope.selectedFile = $files;
        
/*
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++)
        {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: 'api/ops/uploadcsv', //upload.php script, node.js route, or servlet url
                // method: 'POST' or 'PUT',
                method: 'POST', 
                // headers: {'header-key': 'header-value'},
                // withCredentials: true,
                data: {newdataaccount: $scope.newDataAccountName},
                file: file, // or list of files: $files for html5 only
                // fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file
                // customize file formData name ('Content-Desposition'), server side file variable name. 
                Default is 'file' //
                //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                // customize how data is added to formData. See #40#issuecomment-28612000 for sample code //
                //formDataAppender: function(formData, key, val){}
            }).progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                console.log(data);
            });
            //.error(...)
            //.then(success, error, progress); 
            //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
        }
        // alternative way of uploading, send the file binary with the file's content-type.
        // Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
        // It could also be used to monitor the progress of a normal http post/put request with large data
        // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
*/
    };

    $scope.uploadCSV = function()
    {
        var $files = $scope.selectedFile;
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++)
        {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: 'api/ops/uploadcsv', //upload.php script, node.js route, or servlet url
                // method: 'POST' or 'PUT',
                method: 'POST', 
                // headers: {'header-key': 'header-value'},
                // withCredentials: true,
                data: {newdataaccount: $scope.newDataAccountName},
                file: file, // or list of files: $files for html5 only
                // fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file
                /* customize file formData name ('Content-Desposition'), server side file variable name. 
                Default is 'file' */
                //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                //formDataAppender: function(formData, key, val){}
            }).progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                console.log(data);
                $scope.uploadProgress = 0;
                $scope.newDataAccountName = null;
                $scope.newDataFileField = null;
                $scope.updateDataAccountsTable();
            });
            //.error(...)
            //.then(success, error, progress); 
            //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
        }
        /* alternative way of uploading, send the file binary with the file's content-type.
        Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
        It could also be used to monitor the progress of a normal http post/put request with large data*/
        // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
    };

    $scope.addLandingPageUrl = function(userInputUrl)
    {

        DataShareService.LandingPageUrl.save( {dataaccount: $scope.selectedDataAccount.id, landingpageurl: userInputUrl}, function(res) { 
            //console.log(res); 
            $scope.updateDataAccountsTable();
        } );

        /* 
		DataShareService.saveLandingPageUrl( userInputUrl, function(res) {
            console.log("--- Saved Url ---");
            console.log(res);
            $scope.updateDataAccountsTable();
        });
        */
    };
    // Delete landing page url entry
    $scope.deleteLandingPageUrl = function(id) 
    {
        DataShareService.LandingPageUrl.delete( {id: id}, function(res) { 
            //console.log("DElete " + id);
            //console.log(res); 
            $scope.updateDataAccountsTable();
        } );
    };

    // change current word cloud to display in modal
    $scope.setCurrentWordCloudLandingPage = function(landingPageId, landingPageUrl) {
        $scope.currentWordCloud.id = landingPageId;
        $scope.currentWordCloud.url = landingPageUrl;
        $scope.landingPageWordCloud = [{word: '', freq: 'Loading...'}];
        $scope.getLandingPageWordCloud();
    };

    // Get Pre Scraped Landing page word cloud and create a Word Cloud
    $scope.getLandingPageWordCloud = function() {
        DataShareService.ops.getLandingPageWordCloud({id: $scope.currentWordCloud.id}, function (res) {

            // calculate tag level
            var maxCount = 0; 
            var minCount = 1;
            res.forEach( function(elem) {
                maxCount = (elem.freq > maxCount) ? elem.freq : maxCount;
                minCount = (elem.freq < minCount) ? elem.freq : minCount;
            });
            res.forEach( function(elem, ind) {
                elem.level = (0 | (elem.freq - minCount)/(maxCount - minCount) * 5) + 1;
                //console.log(elem.freq + " :: " + minCount + " :: " + maxCount);
            });

            $scope.landingPageWordCloud = res;

        });
    };

    // delete a single word in landing page word cloud
    $scope.deleteLandingPageWordCloudElement = function(landingPageWordId) {
        $scope.landingPageWordCloud = [{word: '', freq: 'Loading...'}];
        DataShareService.ops.deleteLandingPageWordCloudElement({id: landingPageWordId}, function (res) {
            $scope.getLandingPageWordCloud();   // refresh after delete
        });
    };

    // Rescrape landing page
    $scope.rescrapeLandingPage = function() {
        $scope.landingPageWordCloud = [{word: '', freq: 'Loading...'}];
        DataShareService.ops.rescrapeLandingPage({id: $scope.currentWordCloud.id}, function (res) {
            $scope.getLandingPageWordCloud();
            //console.log(res);
        });
    };
	
	/* currently not used
	// Track accordion state
	$scope.toggleAccordion = function(id) {
		$scope.dataSetAccordion[id] = !$scope.dataSetAccordion[id];
	};
	$scope.isAccordionOpen = function(id) {
		return $scope.dataSetAccordion[id];
	};
	*/

    // INIT
    $scope.selectedDataAccount = DataShareService.getSelectedDataAccount();
    $scope.updateDataAccountsTable();

}]);
