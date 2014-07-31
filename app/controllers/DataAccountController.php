<?php

class DataAccountController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		// Return all data accounts
		$temp = [];
		$dataac = DataAccount::all();
		foreach($dataac as $k => $v)
		{
			$v->keywordCount = Keyword::where('dataAccount', $v->id)->count();
			$temp[] = $v;
		}
		return Response::json($temp);
		//return Response::make(DataAccount::get());
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		
		$dataAccount = DataAccount::create(array(
			'dataaccount' => Input::get('dataaccount'),
			'user' => Input::get('user')
		));

		//DB::statement( 'create database data_' . $dataAccount->id );

		return $dataAccount->id;
	
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		// Delete the data account and all data associated with it
		DataAccount::destroy($id);
		Keyword::where('dataAccount', $id)->delete();
		Stopword::where('dataAccount', $id)->delete();
		Negativekeyword::where('dataAccount', $id)->delete();
		DB::table('keywords-segment')->where('dataAccount', $id)->delete();
		DB::table('segmentmap')->where('dataAccount', $id)->delete();
		DB::table('wordcloud')->where('dataAccount', $id)->delete();
		//DB::statement( 'drop database data_' . $id );
		
        return Response::json(array('success' => true));
	}


}
