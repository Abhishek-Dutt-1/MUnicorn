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


// API routes for Keywords
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

// API routes for Stopwords
Route::group(array('prefix' => 'api/stopwords'), function()
{
    // fetch all stopword
    Route::get( '/', 'StopwordController@index' );
    //fetch a subset of stopword
    Route::get( '/{start}/{count}', 'StopwordController@listStopwords' );
    // create a new stopword
    Route::post( '/', 'StopwordController@create' );
    // delete a new stopword
    Route::delete( '/{id}', 'StopwordController@destroy' );

});

// API routes for Negativekeywords
Route::group(array('prefix' => 'api/negativekeywords'), function()
{
    // fetch all Negativekeywords
    Route::get( '/', 'NegativekeywordController@index' );
    //fetch a subset of Negativekeywords
    Route::get( '/{start}/{count}', 'NegativekeywordController@listNegativekeywords' );
    // create a new Negativekeyword
    Route::post( '/', 'NegativekeywordController@create' );
    // delete a new Negativekeyword
    Route::delete( '/{id}', 'NegativekeywordController@destroy' );

});

// API routes for database operations
Route::group(array('prefix' => 'api/ops'), function()
{
    // delete stopwords from keywords
    Route::get( '/deletestopwordsfromkeywords', 'OperationsController@deleteStopWords'); //deleteStopWords' );

});

// Catch all route
App::missing(function($exception)
{
    return View::make('index');
});
