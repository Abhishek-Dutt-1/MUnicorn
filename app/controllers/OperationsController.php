<?php

class OperationsController extends \BaseController {

    // delete stop words
    public function deleteStopWords()
    {
		//$result = DB::statement(" call delete_stopwords( '". substr( Input::get('doNotDelete'), 1, strlen(Input::get('doNotDelete')) - 2 ) ."' )" );
		$result = DB::statement( " call delete_stopwords( '". Input::get('dataaccountid') ."', '". Input::get('doNotDelete') ."' )" );
		
        //$keyword = DB::table('keywords')->where('keyword', 'like', '%online%')->get();
        //$keyword = DB::update('update keywords set keyword = 100 where id = ?', array('1'));
        //$keyword = DB::update( 'update keywords set keyword = replace(keyword, "tv", "REPLACED")' );
        //$keyword = DB::table('keywords')->where('id', 1)->update(array('keyword' => 1));
        
        //////////////////// Implement stop word deletion here
        /*
        $stopwords = DB::table('stopwords')->
        $keyword = DB::update( "UPDATE keywords SET keyword = REPLACE(keyword, 'tv', 'REPLACED')" );

        $result = mysql_query('SELECT id, column FROM table');
        $sql = '';
        while( $row = mysql_fetch_assoc ($result) ) {
            $sql .= "UPDATE table SET column='"
                . mysql_real_escape_string( preg_replace('/[[:alnum:]]/', '', $row['column']) )
                . "' WHERE id = ". intval($row['id']) . "\n";
        }
        mysql_query($sql);
        */
        //////////////////////////////////////
		
        return Response::json( array('success' => true) );
    }

	// delete keyword matching negative keywords
    public function deleteMatchingNegativeKeywords()
    {
		$result = DB::statement( " call delete_negative( '".  Input::get('dataaccountid') ."', '". Input::get('doNotDelete') ."' )" );
		
        return Response::json( array('success' => true) );
    }
	
	// delete order independent duplicates
    public function deleteDuplicatesFromKeywords()
    {
		$result = DB::statement( " call delete_matched( '". Input::get('dataaccountid') ."', '". Input::get('doNotDelete') ."' )" );
		
        return Response::json( Input::get('doNotDelete') );
    }
	
	// Not used
    public function getPhrases($start, $count)
	{
		return Response::json( DB::table('segmentmap')->where('Current_Keyword_Flag', 1)->where('phraselength', 2)->orderBy('count', 'desc')->skip($start)->take($count)->get() );
	}
	
	public function getAllPhrases($dataaccountid, $phraselength)
	{
		return Response::json( DB::table('segmentmap')->where('Current_Keyword_Flag', 1)->where('dataAccount', $dataaccountid)->where('phraselength', $phraselength)->orderBy('count', 'desc')->get() );
	}
	public function refreshPhrases($dataaccountid)
	{
		//$result = DB::statement(" call keyword_count( 1 ) " );
		$result = DB::statement(" call keyword_count( '". Input::get('dataaccountid') ."', 2 ) " );
		
		return ( array('success' => true) );
	}
	
	public function saveInputSegments()
	{
		//$temp = json_decode( Input::get('segmentMap') );
		$temp = Input::get('segmentMap');
		//return var_dump( $temp );
		//return var_dump(Input::get('segmentMap'));
		//return var_dump( json_decode(Input::get('segmentMap')) );
		//return count($temp);
		//return Input::get('segmentMap');
		//return var_dump($temp);
		//return var_dump($temp);
		$idsToNotClear = [];
		
		foreach($temp as $key => $stopword)
		{
			if( trim($stopword["segments"]) != "") 
			{
				DB::table('segmentmap')
					->where('id', $stopword["id"] )
					->update(array('segments' => trim($stopword["segments"]) ));
				
				$idsToNotClear[] = $stopword["id"];
			}
		}
		// clear if $stopword["segments"] == ""
		DB::table('segmentmap')->whereNotIn('id', $idsToNotClear)->update(array('segments' => "" ));;
		
		$result = DB::statement(" call keyword_count( 2 ) " );
		
		//return count($temp);
		//return ( var_dump($temp[0]->id) );
		return ( array('success' => true) );
	}
	
	public function fetchKeywordsAndSegmentsData($dataaccountid, $start, $count)
	{
		return Response::json( DB::table('keywords-segment')->where('dataAccount', $dataaccountid)->skip($start)->take($count)->get() );
	}

	public function fetchAllAccountNames()
	{
		return Response::json( DB::table('dataaccounts')->get() );
	}

	
}
