<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// Home page
Route::get('/', function()
{
	return View::make('index');     // will return app/views/index.php
});

// API routes
// path must begin with 'api/'
//Route::group(array('prefix' => 'api'), function() {
    // path must then have 'keywords/'
//    Route::controller( 'api', 'KeywordController' );
//});

// API routes
Route::group(array('prefix' => 'api/keywords'), function()
{
    // fetch all keywords
    Route::get( '/', 'KeywordController@index' );
    //fetch a subset of keywords
    Route::get( '/{start}/{count}', 'KeywordController@listKeywords' );
    // create a new keyword
    Route::post( '/', 'KeywordController@create' );
    // delete a new keyword
    Route::delete( '/{id}', 'KeywordController@destroy' );

});

// Catch all route
App::missing(function($exception)
{
    return View::make('index');
});
