<?php

class NegativekeywordController extends \BaseController {

	/**
	 * Display a listing of the resource. (as JSON)
	 *
	 * @return Response
	 */
	public function index($dataaccountid)
	{
        //return Response::json(Route::input());
        return Response::json(Negativekeyword::where('dataAccount', $dataaccountid)->get());
	}

	public function listNegativekeywords($start, $count)
	{
        return Response::json( Negativekeyword::skip($start)->take($count)->get() ); 
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function create()
	{
        Negativekeyword::create(array(
            'negativekeyword' => Input::get('Negativekeyword'),
			'dataAccount' => (int)Input::get("dataaccountid")
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
        Negativekeyword::destroy($id);

        return Response::json(array('success' => true));
	}

}
