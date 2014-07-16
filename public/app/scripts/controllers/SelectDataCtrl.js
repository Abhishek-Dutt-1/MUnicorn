'use strict';

keywordSegmentsControllers.controller('SelectDataCtrl', ['$scope', 'DataShareService', function ($scope, DataShareService)
{
    $scope.selectedDataAccount = {};

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


// INIT
$scope.updateDataAccountsTable();


}]);
