<?php

class KeywordController extends \BaseController {

	/**
	 * Display a listing of the resource. (as JSON)
	 *
	 * @return Response
	 */
	public function index()
	{
//        return Response::json( Route::current()->parameters() );
        return Response::json(Keyword::get());
	}

	public function show($id)
	{
//        return Response::json( Keyword::skip($startList)::take($countList)::get() );
            return Response::json(array('success' => true)); 
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
        Keyword::create(array(
            'keyword' => Input::get('keyword'),
            'currency' => Input::get('currency')
        ));

        return Response::json(array('success' => true)); 

	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
        Keyword::destroy($id);

        return Response::json(array('success' => true));
	}


}
