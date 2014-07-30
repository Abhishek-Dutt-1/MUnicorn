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
    // Get All keywords for a given data account id
	Route::get( '/fetchallkeywords/{dataaccountid}', 'KeywordController@fetchAllKeywords' );
	//fetch a subset of keywords
    Route::get( '/{dataaccountid}/{start}/{count}/{orderby}/{desc}', 'KeywordController@listKeywords' );
    // create a new keyword
    Route::post( '/', 'KeywordController@create' );
    // save delete flag checkbox
    //Route::post( '/toggledeleteflag', 'KeywordController@toggleDeleteFlag' );   
    // delete a new keyword
    Route::delete( '/{id}', 'KeywordController@destroy' );
	// Get total keywords count
	Route::get( '/getkeywordcount/{dataaccountid}', 'KeywordController@getKeywordCount' );
    
});

// API routes for Stopwords
Route::group(array('prefix' => 'api/stopwords'), function()
{
    // fetch all stopword
    Route::get( '/{dataaccountid}', 'StopwordController@index' );
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
    Route::get( '/{dataaccountid}', 'NegativekeywordController@index' );
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
    Route::post( '/deletestopwordsfromkeywords', 'OperationsController@deleteStopWords');
    // delete matching negative keywords from keywords
    Route::post( '/deletematchingnegativewordsfromkeywords', 'OperationsController@deleteMatchingNegativeKeywords');
    // delete order indep duplicates
    Route::post( '/deleteduplicatesfromkeywords', 'OperationsController@deleteDuplicatesFromKeywords');
	// Refresh segmentmap table with phrases
	Route::get( '/refreshphrases/{dataaccountid}', 'OperationsController@refreshPhrases');    //step3
	// fetch 2 and 1 word phrases 	-- NOT USED
	Route::get( '/phrases/{start}/{count}', 'OperationsController@getPhrases');    //step3
	// fetch ALL 2 and 1 word phrases
	Route::get( '/getallphrases/{dataaccountid}/{phraselength}', 'OperationsController@getAllPhrases');    //step3
	// save user inputted segments mapping to phrases in the segmentmap table
	Route::post( '/saveinputsegments', 'OperationsController@saveInputSegments');    //step3

	// STEP-4 :: fetch data from keywords-segment table
	Route::get( '/fetchkeywordsandsegmentsdata/{dataaccountid}/{start}/{count}/{orderby}/{desc}', 'OperationsController@fetchKeywordsAndSegmentsData');

	// SELECT DATA :: Fetach all account names
	Route::get( '/fetchallaccountnames', 'OperationsController@fetchAllAccountNames');

    // Upload file route
    Route::post( '/uploadcsv', 'OperationsController@uploadCSV');
	
	// Download final CSV file
	Route::get( '/downloadcsv/{dataaccountid}', 'OperationsController@downloadCSV');
	
	// Download tag cloud string
	Route::get( '/gettagcloud/{dataaccountid}', 'OperationsController@getTagCloud2');
	
	// Step 5 : delete delete Ids and save segmets
	Route::post('/savesegmentmap', 'OperationsController@saveSegmentMap');
	
});

// API routes for Data Account operations
Route::group(array('prefix' => 'api/'), function()
{
	Route::resource('dataaccounts', 'DataAccountController');
/*	
	Verb		Path							Action		Route Name
	GET			/resource						index		resource.index
	GET			/resource/create				create		resource.create
	POST		/resource						store		resource.store
	GET			/resource/{resource}			show		resource.show
	GET			/resource/{resource}/edit		edit		resource.edit
	PUT/PATCH	/resource/{resource}			update		resource.update
	DELETE		/resource/{resource}			destroy		resource.destroy
*/
});


// Catch all route
App::missing(function($exception)
{
	return "XXXX PATH ERROR";
	return var_dump($exception);
    return View::make('index');
});
