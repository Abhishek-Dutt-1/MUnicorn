<?php

// app/models/Keyword.php

class Word extends Eloquent {

    protected $table = 'wordcloud';

	protected $guarded = array('id');

    /// Create 1 word tag cloud
	public static function createWordCloud($dataaccountid)
	{
		$allKeywordArrayTemp = Keyword::where('dataAccount', $dataaccountid)->get( array('keyword') );
		$allKeywordArray = [];
		foreach($allKeywordArrayTemp as $k => $v)
		{
			$allKeywordArray[] = $v->keyword;
		}
		$allKeywordString = implode(" ", $allKeywordArray);
		$allKeywordArray = explode(" ", $allKeywordString);
		
		$tagArray = [];
		foreach($allKeywordArray as $k => $v)
		{
			if( isset($tagArray[$v]) )
			{
				$tagArray[$v]++;
			}
			else {
				$tagArray[$v] = 1;				
			}
		}
		//arsort($tagArray, SORT_NUMERIC );		//Sort alphabetically
		$insertData = [];
		foreach($tagArray as $word => $count)
		{
			$insertData[] = array('word' => $word, 'freq' => $count, 'numword' => 1, 'dataaccount' => $dataaccountid);
		}
		DB::table('wordcloud')->insert( $insertData );
		/*
		DB::table('wordcloud')->insert(array(
			array(
				'message' => 'A new comment.',
				'post_id' => $postId),
			array(
				'message' => 'A second comment', 
				'post_id' => $postId
			),
		));
        foreach($tagArray as $word => $count)
        {
            Word::create( array('word' => $word, 'freq' => $count, 'numword' => 1, 'dataaccount' => $dataaccountid) );
        }
		*/
		Word::createWordCloud2($dataaccountid);
		
		return Response::json( $insertData );
		
	}
	
    // create 2 word tag cloud
	public static function createWordCloud2($dataaccountid)
	{
		$tagArray = [];
		$temp = [];
		$temp = Keyword::where('dataAccount', $dataaccountid)->get( array('keyword') );
		foreach($temp as $key => $keywrd)
		{
			$temp = explode(" ", $keywrd->keyword);
			if(sizeof($temp) > 1)
			{
				if( isset($tagArray[ $temp[0] . " " . $temp[1] ]) )
				{
					$tagArray[ $temp[0] . " " . $temp[1] ]++;
				}
				else
				{
					$tagArray[ $temp[0] . " " . $temp[1] ] = 1;
				}
			}
		}

		$insertData = [];
		foreach($tagArray as $word => $count)
		{
			$insertData[] = array('word' => $word, 'freq' => $count, 'numword' => 2, 'dataaccount' => $dataaccountid);
		}
		DB::table('wordcloud')->insert( $insertData );
		
		return Response::json( $tagArray );
	}
	
}
