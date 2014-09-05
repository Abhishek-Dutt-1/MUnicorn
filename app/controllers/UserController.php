<?php

class UserController extends \BaseController {

	/*
	/// Constructor to prevent CSRF
	public function __construct() {
		$this->beforeFilter('csrf', array('on'=>'post'));
	}
	*/

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
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
		$validator = Validator::make(Input::all(), User::$rules);
		//return var_dump( User::$rules );

		if ($validator->passes()) {
		
			$user = new User;
			$user->email = Input::get('email');
			$user->password = Hash::make( Input::get('password') );
			
			$user->save();
			
			return $user;
			
		} else {
			//return Input::all();
			//return var_dump($validator);
			return Response::json($validator->messages(), 422);
		
		}

	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		return Response::json( User::find($id) );
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
		//
	}


}
