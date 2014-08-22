<?php

class WordController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index($dataaccount)
	{
        return Response::json( Word::where('dataaccount', $dataaccount)->get() );
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
		//
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
		//
	}

    // save word cloud info
	public function saveSegmentMap($dataaccount) 
	{
		/* $deleteIds = Word::where('dataaccount', $dataaccount)->get( array('id') );
			$notDeleteIds = []; $tmp = [];
		*/
		//return Response::json( count(Input::get('idsToBeDeleted')) );
		
		if( count(Input::get('idsToBeDeleted')) > 0 )
		{
			Keyword::destroy( Input::get('idsToBeDeleted') );
			// refresh wordcloud only if some keyword is deleted
			Word::where('dataaccount', $dataaccount)->delete();
			Word::createWordCloud($dataaccount);
		}
		
		foreach( Input::get('segmentMap') as $k => $word )
		{
			Word::where('dataaccount', $dataaccount)->where( 'word', $word['word'] )->update( array('segment'=>$word['segment'], 
											'brand'=>$word['brand'], 
											'compete'=>$word['compete'], 
											'negativeword'=>$word['negativeword'], 
											'stopword'=>$word['stopword']) );
										//	'numword'=>$word['numword'], 
										//	'dataaccount'=>$word['dataaccount']) );
			
			//$notDeleteIds[] = $word['id'];
			//Word::find( $word['id'] )->update($word);
		}
		/*
		foreach($deleteIds as $k=>$v)
		{
			if(in_array($v['id'], $notDeleteIds)) $tmp[] = $v['id'];
		}
		return $tmp; 
		*/
		return Response::json( array( 'success' => true ) );
	/*
	//return Response::json( count(Input::get('toBeDeleted')) );
		if( count(Input::get('toBeDeleted')) > 0 ) Keyword::destroy(Input::get('toBeDeleted'));
		
		$tempId = [];
		$tempSeg = [];
		
		//return Response::json( count(Input::get('segmentMap')) );
		
		if( count(Input::has('segmentMap')) > 0)
		{ 
			foreach(Input::get('segmentMap') as $key => $val)
			{
				$tempId[] = $val['id'];
				$tempSeg[] = $val['segment'];
				Keyword::find($val['id'])->update( array('usersegment' => $val['segment']) );
			}
		}
		//Keyword::find($tempId)->update( array('usersegment' => $tempSeg) )->save();
		return Response::json( Keyword::find($tempId) );
		//return Response::json( array('success' => true) );
		//return Response::json( Input::get('segmentMap') );
	*/

	}
}
