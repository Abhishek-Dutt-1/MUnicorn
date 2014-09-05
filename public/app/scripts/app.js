'use strict';

var keywordSegmentsApp = angular.module('keywordSegmentsApp', ['ngRoute', 'keywordSegmentsControllers']);

keywordSegmentsApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'app/views/main.html',
			controller: 'MainCtrl'
		}).
		when('/data', {
			templateUrl: 'app/views/SelectData.html',
			controller: 'SelectDataCtrl'
		}).
/*		when('/Step1', {
			templateUrl: 'app/views/Step1.html',
			controller: 'Step1Ctrl'
		}).
		when('/Step2', {
			templateUrl: 'app/views/Step2.html',
			controller: 'Step2Ctrl'
		}).
		when('/Step3', {
			templateUrl: 'app/views/Step3.html',
			controller: 'Step3Ctrl'
		}).
*/
		when('/Step5', {
			templateUrl: 'app/views/Step5.html',
			controller: 'Step5Ctrl'
		}).
		when('/Step6', {
			templateUrl: 'app/views/Step6.html',
			controller: 'Step6Ctrl'
		}).
/*		when('/Step4', {
			templateUrl: 'app/views/Step4.html',
			controller: 'Step4Ctrl'
		}).	*/
		when('/About', {
			templateUrl: 'app/views/About.html',
			controller: 'AboutCtrl'
		}).
		when('/login', {
			templateUrl: 'app/views/login.html',
			controller: 'LoginCtrl'
		}).
		when('/user/:userId', {
			templateUrl: 'app/views/UserProfile.html',
			controller: 'UserProfileCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);
