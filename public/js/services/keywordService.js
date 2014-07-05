// public/js/services/keywordService.js
angular.module('keywordService', [])

	.factory('Keyword', function($http) {

		return {
			// get all the keywords
			get : function() {
				return $http.get('/api/keywords');
			},

			// save a keyword (pass in keyword data)
			save : function(keywordData) {
				return $http({
					method: 'POST',
					url: '/api/keywords',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(keywordData)
				});
			},

			// destroy a keyword
			destroy : function(id) {
				return $http.delete('/api/keywords/' + id);
			}
		}

	});
	
