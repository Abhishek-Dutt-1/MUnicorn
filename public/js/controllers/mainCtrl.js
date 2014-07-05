// public/js/controllers/mainCtrl.js
angular.module('mainCtrl', [])

	// inject the Comment service into our controller
	.controller('mainController', function($scope, $http, Keyword) {

		// object to hold all the data for the new keyword form
		$scope.keywordData = {};

		// loading variable to show the spinning loading icon
		$scope.loading = true;

		// get all the keywords first and bind it to the $scope.keywords object
		// use the function we created in our service
		// GET ALL COMMENTS ====================================================
		Keyword.get()
			.success(function(data) {
                console.log(data);
				$scope.keywords = data;
				$scope.loading = false;
			});

		// function to handle submitting the form
		// SAVE A COMMENT ======================================================
		$scope.submitKeyword = function() {
			$scope.loading = true;

			// save the keyword. pass in keyword data from the form
			// use the function we created in our service
			Keyword.save($scope.keywordData)
				.success(function(data) {

					// if successful, we'll need to refresh the keyword list
					Keyword.get()
						.success(function(getData) {
							$scope.keywords = getData;
							$scope.loading = false;
						});

				})
				.error(function(data) {
					console.log(data);
				});
		};

		// function to handle deleting a keyword
		// DELETE A Keyword ====================================================
		$scope.deleteKeyword = function(id) {
			$scope.loading = true; 

			// use the function we created in our service
			Keyword.destroy(id)
				.success(function(data) {

					// if successful, we'll need to refresh the keyword list
					Keyword.get()
						.success(function(getData) {
							$scope.keywords = getData;
							$scope.loading = false;
						});

				});
		};

	});

