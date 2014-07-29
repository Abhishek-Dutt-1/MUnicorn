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

	public function fetchAllKeywords($dataaccountid)
	{
		return Response::json( Keyword::where('dataAccount', $dataaccountid)->get() );
	}
	
	public function getKeywordCount($dataaccountid)
	{
		return Response::json( array( 'count' => Keyword::where('dataAccount', $dataaccountid)->count() ) );
	}

	public function listKeywords($dataaccountid, $start, $count, $orderby, $desc)
	{
	/*
		$details = new StdClass();
		$details->host = 'localhost';
		$details->database = 'data_17';
		$details->username = 'root';
		$details->password = 'root';
		
		//Config::set('database.connections.mysqlCustom.database', $details->database);
		Config::set('database.connections.key', array(
			'driver'    => 'mysql',
			'host'      => 'localhost',
			'database'  => 'data_18',
			'username'  => 'root',
			'password'  => 'root',
			));
		*/
		
		//Config::set('database.connections.account', ['driver' => 'mysql', 'host' => $details->host, 'database' => $details->database, 'username' => $details->username, 'password' => $details->password]);		
		//Config::set('database.connections.default', 'account');
		//DB::setDefaultConnection('account');
		/*
		Config::set('database.connections.mysql_tenant.database', $details->database);
		DB::setDefaultConnection('mysql_tenant');
		*/
		if($desc == 'true') $desc = 'desc'; else $desc = 'asc';
		$totalRows = Keyword::where('dataAccount', $dataaccountid)->count();
		return Response::json( array( 'count' => $totalRows, 'data' => Keyword::where('dataAccount', $dataaccountid)->skip($start)->take($count)->orderBy($orderby, $desc)->get() ) ); 
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
