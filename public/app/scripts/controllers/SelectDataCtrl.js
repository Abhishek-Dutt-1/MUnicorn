'use strict';

keywordSegmentsControllers.controller('SelectDataCtrl', ['$scope', '$upload', 'DataShareService', function ($scope, $upload, DataShareService)
{
    $scope.selectedDataAccount = {};
    $scope.uploadProgress = 0;

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
                    console.log(res);
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
        });
    };

    $scope.uploadCSVData = function(dataAccountId)
    {

    };
    
    // data account name clicked in the View
    $scope.setSelectDataAccount = function(dataAccountId, dataAccountName) {

        DataShareService.setSelectedDataAccount( dataAccountId, dataAccountName, function(res) {
            $scope.selectedDataAccount.id = res.id; 
            $scope.selectedDataAccount.name = res.name; 
            console.log( $scope.selectedDataAccount );
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

    }

    // INIT

    $scope.selectedDataAccount = DataShareService.getSelectedDataAccount();
    $scope.updateDataAccountsTable();


}]);
