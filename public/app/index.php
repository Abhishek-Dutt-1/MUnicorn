<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" class="no-js" ng-app="keywordSegmentsApp"> <!--<![endif]-->
  <head  ng-controller="headCtrl">
    <meta charset="utf-8">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <!-- build:css styles/vendor.css -->
    <!-- bower:css -->
    <link rel="stylesheet" href="app/bower_components/bootstrap/dist/css/bootstrap.css" />
	<link rel="stylesheet" href="app/bower_components/angular-motion/dist/angular-motion123.min.css">
	<link rel="stylesheet" href="app/bower_components/ngprogress/ngProgress.css">
    <!-- endbower -->
    <!-- endbuild -->
    <!-- build:css({.tmp,app}) styles/main.css -->
    <link rel="stylesheet" href="app/styles/main11.css">
	<!-- 	<link rel="stylesheet" href="app/styles/less.css">		-->
	<link rel="stylesheet" href="app/styles/{{themeName}}.css">
	<link rel="stylesheet" href="app/styles/animate.css">
    <!-- endbuild -->
  </head>
  <body>
    <!--[if lt IE 7]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <!-- Add your site or application content here -->
    <div class="container-fluid">
		<div class="row" ng-controller="primaryNavCtrl">
			<div ng-include="'app/views/primaryNav.html'"></div>
		</div>
		<div class="row">
<!--
			<div ng-controller="secondaryNavCtrl" class="col-md-2" >
				<div id="secondaryNav" ng-class="{hidden:isActive('/') || isActive('/About') || isActive('/login')}" ng-include="'app/views/SecondaryNav.html'">
				</div>
			</div>
-->
			<div class="col-md-12">
				<div class="" ng-view></div>
			</div>
		</div>
	</div>
		
    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID -->
	<!--
     <script>
       (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
       (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
       m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
       })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
       ga('create', 'UA-XXXXX-X');
       ga('send', 'pageview');
    </script>
	-->
	
    <!--[if lt IE 9]>
    <script src="bower_components/es5-shim/es5-shim.js"></script>
    <script src="bower_components/json3/lib/json3.min.js"></script>
    <![endif]-->

    <!-- build:js scripts/vendor.js -->
    <!-- bower:js -->
    <script src="app/bower_components/ng-file-upload/angular-file-upload-shim.min.js"></script>
    <script src="app/bower_components/jquery/dist/jquery.js"></script>
    <script src="app/bower_components/angular/angular.js"></script>
	<script src="app/bower_components/angular-animate/angular-animate.min.js"></script>
    <script src="app/bower_components/bootstrap/dist/js/bootstrap.js"></script>
    <script src="app/bower_components/angular-resource/angular-resource.js"></script>
    <script src="app/bower_components/angular-route/angular-route.js"></script>
    <script src="app/bower_components/angular-sanitize/angular-sanitize.js"></script>
    <script src="app/bower_components/ng-file-upload/angular-file-upload.min.js"></script>
	<script src="app/bower_components/ngprogress/build/ngProgress.min.js"></script>
    <!-- endbower -->
    <!-- endbuild -->

        <!-- build:js({.tmp,app}) scripts/scripts.js -->
        <script src="app/scripts/app.js"></script>
		<script src="app/scripts/filters/filters.js"></script>
		<script src="app/scripts/services/services.js"></script>
		<script src="app/scripts/services/AuthService.js"></script>
		<script src="app/scripts/services/constants.js"></script>
<!--		<script src="app/scripts/directives/directives.js"></script>	-->
        <script src="app/scripts/controllers/controllers.js"></script>
		<script src="app/scripts/controllers/HeadCtrl.js"></script>
		<script src="app/scripts/controllers/PrimaryNavCtrl.js"></script>
        <script src="app/scripts/controllers/SecondaryNavCtrl.js"></script>
		<script src="app/scripts/controllers/LoginCtrl.js"></script>
		<script src="app/scripts/controllers/AboutCtrl.js"></script>
		<script src="app/scripts/controllers/SelectDataCtrl.js"></script>
<!--		<script src="app/scripts/controllers/Step1Ctrl.js"></script>
		<script src="app/scripts/controllers/Step2Ctrl.js"></script>
		<script src="app/scripts/controllers/Step3Ctrl.js"></script>
		<script src="app/scripts/controllers/Step4Ctrl.js"></script>	-->
		<script src="app/scripts/controllers/Step5Ctrl.js"></script>
		<script src="app/scripts/controllers/Step6Ctrl.js"></script>
		<script src="app/scripts/controllers/UserProfileCtrl.js"></script>
        <!-- endbuild -->
</body>
</html>
