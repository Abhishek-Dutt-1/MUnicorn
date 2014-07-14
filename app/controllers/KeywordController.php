<?php

class KeywordController extends \BaseController {

	/**
	 * Display a listing of the resource. (as JSON)
	 *
	 * @return Response
	 */
	public function index()
	{
        //return Response::json(Route::input());
        return Response::json(Keyword::get());
	}

	public function listKeywords($start, $count)
	{
        return Response::json( Keyword::skip($start)->take($count)->get() ); 
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function create()
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
/*
    // sync delete checkbox state with db
    public function toggleDeleteFlag()
    {
        $keyword = Keyword::find( Input::get('id') );
		if(Input::get('state') == 'true') {
			$keyword->deleteflag =  1;
		} else {
			$keyword->deleteflag =  0;
		}
        $keyword->save();

        return Response::json( array(Input::get('state'), $keyword) );
    }
*/
}
