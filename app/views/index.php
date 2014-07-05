<!-- app/views/index.php -->
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Laravel and Angular Keyword System</title>

	<!-- CSS -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css"> <!-- load bootstrap via cdn -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"> <!-- load fontawesome -->
	<style>
		body 		{ padding-top:30px; }
		form 		{ padding-bottom:20px; }
		.comment 	{ padding-bottom:20px; }
	</style>

	<!-- JS -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.8/angular.min.js"></script> <!-- load angular -->

	<!-- ANGULAR -->
	<!-- all angular resources will be loaded from the /public folder -->
		<script src="js/controllers/mainCtrl.js"></script> <!-- load our controller -->
		<script src="js/services/keywordService.js"></script> <!-- load our service -->
		<script src="js/app.js"></script> <!-- load our application -->

</head>
<!-- declare our angular app and controller -->
<body class="container" ng-app="keywordApp" ng-controller="mainController">
<div class="col-md-8 col-md-offset-2">

	<div class="page-header">
		<h2>Laravel and Angular Single Page Application</h2>
		<h4>Keyword System</h4>
	</div>

	<form ng-submit="submitKeyword()"> <!-- ng-submit will disable the default form action and use our function -->

		<div class="form-group">
			<input type="text" class="form-control input-sm" name="currency" ng-model="keywordData.currency" placeholder="Currency">
		</div>

		<div class="form-group">
			<input type="text" class="form-control input-lg" name="keyword" ng-model="keywordData.keyword" placeholder="Say what you have to say">
		</div>
		
		<div class="form-group text-right">	
			<button type="submit" class="btn btn-primary btn-lg">Submit</button>
		</div>
	</form>

	<p class="text-center" ng-show="loading"><span class="fa fa-meh-o fa-5x fa-spin"></span></p>

	<div class="comment" ng-hide="loading" ng-repeat="keyword in keywords">
		<h3>keyword #{{ keyword.id }} <small>by {{ keyword.currency }}</small></h3>
		<p>{{ keyword.keyword }}</p>

		<p><a href="#" ng-click="deleteKeyword(keyword.id)" class="text-muted">Delete</a></p>
	</div>

</div>
</body>
</html>
