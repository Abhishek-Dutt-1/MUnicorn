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
	
	// update segmentmap table
	public function refreshPhrases($dataaccountid)
	{
		//$result = DB::statement(" call keyword_count( 1 ) " );
		//return $dataaccountid;
		$result = DB::statement(" call keyword_count( '". $dataaccountid ."', 2 ) " );
		
		return " call keyword_count( '". $dataaccountid ."', 2 ) ";
		return ( array('success' => true) );
	}
		
	// get all phrases data for a given dataAccount
	public function getAllPhrases($dataaccountid, $phraselength)
	{
		return Response::json( DB::table('segmentmap')->where('Current_Keyword_Flag', 1)->where('dataAccount', $dataaccountid)->where('phraselength', $phraselength)->orderBy('count', 'desc')->get() );
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
		$idsToNotClear[] = -1;
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
		DB::table('segmentmap')->where('dataAccount', Input::get('dataaccountid'))->whereNotIn('id', $idsToNotClear)->update(array('segments' => "" ));;
		
		$result = DB::statement(" call keyword_count( '". Input::get('dataaccountid') ."', 2 ) " );
		
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

    // handle uploaded CSV data file
	public function uploadCSV()
	{
		//return public_path();
		$dataAccount = DataAccount::create(array(
			'dataaccount' => Input::get('newdataaccount'),
			'user' => 'USER'
		));
		$dataaccount = $dataAccount->id;
		
		//return Input::get('newdataaccount');
	    
		if (Input::hasFile('file'))
		{
			$file = Input::file('file');
			$name = time() . '-' . $file->getClientOriginalName();
			//check out the edit content on bottom of my answer for details on $storage
			//$storage = public_path().'/../app/storage'; 
			$storage = public_path(); 
			$path = $storage . '/uploads/CSV/';
			// Moves file to folder on server
			$file->move($path, $name);
			// Import the moved file to DB and return OK if there were rows affected
			return ( $this->_import_csv($path, $name, $dataaccount) ); //? 'OK' : 'No rows affected' );

		}
		//return Response::json( Input::file('file')->getClientOriginalName() );
	}

	// Private helper function to help importing keyword csv to database
	private function _import_csv($path, $filename, $dataaccount)
	//private function _import_csv($filename)
	{
		$csv = $path.$filename;
		/*
		//ofcourse you have to modify that with proper table and field names
		//$query = sprintf("LOAD DATA local INFILE '%s' INTO TABLE your_table FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' ESCAPED BY '\"' LINES TERMINATED BY '\\n' IGNORE 0 LINES (`filed_one`, `field_two`, `field_three`)", addslashes($csv));
		*/
		// Ignore 1st header row
		$query = sprintf("LOAD DATA local INFILE '%s' INTO TABLE keywords FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '\"' ESCAPED BY '\"' LINES TERMINATED BY '\n' IGNORE 1 LINES (`adGroup`, `keyword`, `currency`, `avMonthlySearches`, `competition`, `suggestedBid`, `impressionShare`, `inAccount`, `inPlan`, `extractedFrom`)", addslashes($csv));
		DB::connection()->getpdo()->exec($query);
		// these new rows will have default dataAccount value of 0 change all of them to $dataaccount
		return Keyword::where('dataAccount', 0)->update( array('dataAccount' => $dataaccount) );
		
		
		///////////////////////////////////////////////////////////////////////		
		//get the csv file 
		/*	OLD Methond adding one row at a time
		$i = 0;		// to skip first header row of the csv file
		$file = $csv;
		$handle = fopen($file,"r"); 
		//loop through the csv file and insert into database 
		while ($data = fgetcsv($handle,1000,",","'"))
		{
			if( $i == 0) { $i++; continue;}
			if ($data[0]) { 
				DB::statement("INSERT INTO keywords (`adGroup`, `keyword`, `currency`, `avMonthlySearches`, `competition`, `suggestedBid`, `impressionShare`, `inAccount`, `inPlan`, `extractedFrom`, `dataAccount`) VALUES 
					( 
						'".addslashes($data[0])."', 
						'".addslashes($data[1])."', 
						'".addslashes($data[2])."', 
						'".addslashes($data[3])."', 
						'".addslashes($data[4])."', 
						'".addslashes($data[5])."', 
						'".addslashes($data[6])."', 
						'".addslashes($data[7])."', 
						'".addslashes($data[8])."', 
						'".addslashes($data[9])."',
						'".$dataaccount."'
					)
				");
			}
		}
		*/
	}
	
	public function downloadCSV($dataaccountid)
	{
		$headers = array(
			'Content-Type' => 'text/csv',
			'Content-Disposition' => 'attachment; filename="ExportFileName.csv"',
			'Pragma' => 'no-cache',
			'Expires' => 0,
		);
		
		//return Response::json( DB::table('keywords-segment')->where('dataAccount', $dataaccountid)->skip($start)->take($count)->get() );
	
		//return DB::statement(' SELECT * INTO OUTFILE "../../../tmp/resultTMP1111.csv" FIELDS TERMINATED BY "," OPTIONALLY ENCLOSED BY "" ESCAPED BY "\\" LINES TERMINATED BY "||"  FROM keywords-segment ');
		
		/*
		DB::statement(' SELECT * INTO OUTFILE "../../htdocs/xxx.csv" FIELDS TERMINATED BY "," FROM `keywords-segment` ');
		return Response::json( array( 'file' => 'xxx.csv' ));
		*/

		$table = DB::table('keywords-segment')->where('dataAccount', $dataaccountid)->get();
		//$output='';
		$output = "Ad group,Keyword,Currency,Avg. Monthly Searches (exact match only),Competition,Suggested bid,Impr. share,In account?,In plan?,Extracted From,Segment,Brand,Compete".PHP_EOL;
		
		foreach ($table as $row) {
			//return var_dump($row);
			//return $row->adGroup . "," . $row->keyword . "," . $row->currency . "," . $row->avMonthlySearches . "," . $row->competition . "," . $row->suggestedBid . "," . $row->impressionShare . "," . $row->inAccount . "," . $row->inPlan . "," . $row->NAME . "," . $row->Brand . "," . $row->Compete;
			/*
			$output.= $row->adGroup . "," 
					. $row->keyword . "," 
					. $row->currency . "," 
					. $row->avMonthlySearches . ","
					. $row->competition . ","
					. $row->suggestedBid . ","
					. $row->impressionShare . ","
					. $row->inAccount . ","
					. $row->inPlan . ","
					//. $row->extractedFrom . "," 
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->extractedFrom) . "," 
					. str_replace(',', ';', $row->NAME) . "," 
					. $row->Brand . "," 
					. $row->Compete . PHP_EOL;
					*/

			$output.= preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->adGroup ) . "," 
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->keyword ) . "," 
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->currency ) . "," 
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->avMonthlySearches ) . ","
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->competition ) . ","
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->suggestedBid ) . ","
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->impressionShare ) . ","
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->inAccount ) . ","
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->inPlan ) . ","
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->extractedFrom ) . "," 
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', str_replace(',', ';', $row->NAME) ) . "," 
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->Brand ) . "," 
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->Compete ) . PHP_EOL;

					
			//return Response::json($output);
			//$output.=  $row; //implode(",",$row->to_array());
		}

		
		return Response::json( array( 'file' => $output ));
		
		//return Response::json($output);
		
		//return Response::make($output, 200, $headers);
		
	}
	
	public function getTagCloud($dataaccountid)
	{
		$cloud = new Arg\Tagcloud\TagCloud();
		
		$output = '';
		$output1 = '';
		$tagArray = [];
		$temp = Keyword::where('dataAccount', $dataaccountid)->get( array('keyword'));
		foreach($temp as $key => $keywrd)
		{
			$output .= $keywrd->keyword . " ";
			//$output[] = $keywrd->keyword;
			//$cloud->addTag( array( 'tag' => $keywrd->keyword, 'colour' => rand() ) );

			foreach(explode(" ", $keywrd->keyword) as $k => $v)
			{
				if( isset($tagArray[$v]) )
				{
					$tagArray[$v]++;
				}
				else {
					$tagArray[$v] = 1;				
				}
				
				//$tagArray[$v] = $tagArray[$v] + 1;
			}
		}
		arsort($tagArray, SORT_NUMERIC );		//Sort alphabetically
		//sort($tagArray);
		return Response::json( $tagArray );
		
		
		$maxCount = 0; $minCount = 0; $class ='';
		foreach($tagArray as $tag => $count)
		{
			$maxCount = ($count > $maxCount) ? $count : $maxCount;
			$minCount = ($count < $minCount || $minCount == NULL) ? $count: $minCount;
		}
		foreach($tagArray as $tag => $count)
		{
		/*
			if($count == $maxCount) $class = 'largeTag';
			else if($count >= ($maxCount/3)) $class = 'mediumTag';
			else $class = 'smallTag';
			$output1 .= '<span class="'. $class .'" style="font-size:' . $count/$maxCount . 'em;" >'. $tag .'</span>';
		*/
			//$class = 'tag'.(int)(($count/$maxCount)*10);
			$output1 .= '<span class="'. $class .'" style="font-size:' . $count/$maxCount . 'em;" >'. $tag . '('.$count.')' .'</span> ';
		}
		
		$output1 = '<div style="font-size: 56px">' . $output1 . '</div>';
		return Response::json( array( 'tag' => $output1 ) );
	
	
		
		return Response::json( $tagArray );
		//$cloud->addTags( $output );
		$cloud->addString( $output );
		
		
		return Response::json( array( 'tag' => $cloud->render() ) );
		
	}
	
}
