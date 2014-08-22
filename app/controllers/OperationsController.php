<?php

use xj\snoopy\Snoopy;

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
	
	// PHP implimentation of JavaScript function in the frontend
	function calcLPScore($keyword, $lpWCArray)
	{
		$score = [];
		foreach($lpWCArray as $url => $lpWC)
		{
			$keywordArray = explode(" ", $keyword);
			$matched = array_filter($keywordArray, function($n) use($lpWC) {
				return array_filter($lpWC, function($e) use($n) {
					return $e->word == $n;
				});
			});
			//return $matched;
			$score[] = array('landingPageUrl' => $url, 'score' => count($matched)/count($keywordArray) );
			//$score[] = (object) array('landingPageUrl' => $url, 'score' => count($matched)/count($keywordArray) );
		}
		//return $score;
		return json_encode($score);
	}
	// update segmentmap table
	public function refreshPhrases($dataaccountid)
	{
		//$result = DB::statement(" call keyword_count( 1 ) " );
/*		$result = DB::statement(" call keyword_count( '". $dataaccountid ."', 2 ) " );
		return " call keyword_count( '". $dataaccountid ."', 2 ) ";
		return ( array('success' => true) );
*/
		$startTime = microtime(true);
		
		$keywords = Keyword::where('dataAccount', $dataaccountid)->get();
		$wordCloud = Word::where('dataAccount', $dataaccountid)->get();
		$landingPageIds = DataAccount::find($dataaccountid)->landingPageUrls()->get();			// Laravel's magic
		$landingPageWordCloud = [];
		foreach($landingPageIds as $lp)
		{
			$landingPageWordCloud[$lp->landingpageurl] = DB::table('landingpagewordcloud')->where('landing_page_urls_id', $lp->id)->orderBy('freq', 'DESC')->get(array('word', 'freq'));
		}
		//return $landingPageWordCloud;
		$insertData = [];
		DB::table('keywords_segment')->truncate();
		foreach($keywords as $keyword)
		{
			$seg = '';
			$brand = 0;
			$compete = 0;
			foreach($wordCloud as $word)
			{
				//if(strpos($keyword['keyword'], $word['word']) !== false)	// found word (cloud) found in keyword
				if(preg_match("/\b".$word['word']."\b/", $keyword['keyword']) === 1)	// found word (cloud) found in keyword
				{
					//$seg .= $word['segment'] . ',';
					if( ($word['segment'] != '') && ($word['segment'] != null) && ($word['segment'] != ' ') )
					{
						$seg .= $word['segment'] . ',';
					}
					$brand = $brand || $word['brand'];
					$compete = $compete  || $word['compete'];
				}
			}
			if($seg != '')
			{
				$seg = substr($seg, 0, -1);
			}
			$seg = array_unique(explode(',', $seg));		// remove duplicates and sort
			sort($seg);
			$seg = implode(",", $seg);
			
			//return calcLPScore($keyword['keyword'], $landingPageWordCloud);
			
			$insertData[] = array('adGroup' => $keyword['adGroup'], 
				'keyword' => $keyword['keyword'], 
				'lpscore' => $this->calcLPScore($keyword['keyword'], $landingPageWordCloud),
				'currency' => $keyword['currency'], 
				'avMonthlySearches' => $keyword['avMonthlySearches'],
				'competition' => $keyword['competition'],
				'suggestedBid' => $keyword['suggestedBid'],
				'impressionShare' => $keyword['impressionShare'],
				'inAccount' => $keyword['inAccount'],
				'inPlan' => $keyword['inPlan'],
				'extractedFrom' => $keyword['extractedFrom'],
				'segment' => $seg,
				'brand' => $brand,
				'compete' => $compete,
				'dataAccount' => $keyword['dataAccount']
			);
			//return $ind . " | " . $keyword['keyword'] . " | " . $word['word'] . " | " . $seg;			
			//return $insertData;
		}
		DB::table('keywords_segment')->insert( $insertData );
		//return Response::json( array('success' => true) );
		return "Elapsed time is: ". (microtime(true) - $startTime) ." seconds";
		return Response::json( $insertData );
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
	
	public function fetchKeywordsAndSegmentsData($dataaccountid, $start, $count, $orderby, $desc)
	{
		if($desc == 'true') $desc = 'desc'; else $desc = 'asc';
		$totalRows = DB::table('keywords_segment')->where('dataAccount', $dataaccountid)->count();
		
		return Response::json( array( 'count' => $totalRows, 'data' => DB::table('keywords_segment')->where('dataAccount', $dataaccountid)->skip($start)->take($count)->orderBy($orderby, $desc)->get() ) ); 
		
		//return Response::json( DB::table('keywords-segment')->where('dataAccount', $dataaccountid)->skip($start)->take($count)->get() );
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
			$this->_import_csv($path, $name, $dataaccount); //? 'OK' : 'No rows affected' );

			// After upload create word cloud
			return Response::json( Word::createWordCloud($dataaccount) );
			
			return ( 'OK' ); //? 'OK' : 'No rows affected' );
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
		
		$maxSeg = 0;		// even if no segments are inputted, still blank Segment1 column will be there
		
		//return Response::json( DB::table('keywords-segment')->where('dataAccount', $dataaccountid)->skip($start)->take($count)->get() );
	
		//return DB::statement(' SELECT * INTO OUTFILE "../../../tmp/resultTMP1111.csv" FIELDS TERMINATED BY "," OPTIONALLY ENCLOSED BY "" ESCAPED BY "\\" LINES TERMINATED BY "||"  FROM keywords-segment ');
		
		/*
		DB::statement(' SELECT * INTO OUTFILE "../../htdocs/xxx.csv" FIELDS TERMINATED BY "," FROM `keywords-segment` ');
		return Response::json( array( 'file' => 'xxx.csv' ));
		*/

		$table = DB::table('keywords_segment')->where('dataAccount', $dataaccountid)->get();
		$output = '';
		
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
					$scoreStr = '';
					$maxLP = 0;
					$LPNames = [];
					foreach(json_decode($row->lpscore) as $lp)
					{
						$scoreStr .= $lp->score . ",";
						$LPNames[] = $lp->landingPageUrl;
						$maxLP++;
					}
					if($scoreStr != '')
					{
						$scoreStr = substr($scoreStr, 0, -1);
					}
					//return Response::json($scoreStr);
					
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
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $scoreStr ) . ","
					. (($row->brand == 1)? 'Y' : '-' ). ","
					. (($row->compete == 1)? 'Y' : '-' ). ","
					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->segment ) . PHP_EOL;
					
					$maxSeg = substr_count($row->segment, ',') > $maxSeg ? substr_count($row->segment, ',') : $maxSeg;
					
//					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', str_replace(',', ';', $row->NAME) ) . PHP_EOL;
//					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->brand ) . "," 
//					. preg_replace( '/[\x00-\x1F\x80-\x9F]/u', '', $row->compete ) . PHP_EOL;

			//return Response::json($output);
			//$output.=  $row; //implode(",",$row->to_array());
		}

		$maxSeg += 1;		// even if no segments are inputted, still blank Segment1 column will be there
		$titleRow = "Ad group,Keyword,Currency,Avg. Monthly Searches (exact match only),Competition,Suggested bid,Impr. share,In account?,In plan?,Extracted From";
		for($i =1; $i <= $maxLP; $i++)
		{
			$titleRow .= ",Score(" . $LPNames[$i-1] . ")";
		}
		$titleRow .= ",Brand,Compete";
		for($i =1; $i <= $maxSeg; $i++)
		{
			$titleRow .= ",Segment " . $i;
		}
		$titleRow .= PHP_EOL;
	
		$output = $titleRow . $output;
		return Response::json( array( 'file' => $output ));

		//return Response::json($output);
		//return Response::make($output, 200, $headers);
	}
	
	// Scrape a given landing page and create a word cloud
	public function scrapeLandingPage($landingpageid)
	{
		DB::table('landingpagewordcloud')->where('landing_page_urls_id', $landingpageid)->delete();
		
		$snoopy = new Snoopy;
		$snoopy->fetchtext( LandingPageUrl::find($landingpageid)->landingpageurl );
		$body = $snoopy->results;
		$body = strtolower($body);
		//$body = strip_tags($body);
		$body = html_entity_decode( $body );
		$body = preg_replace('!\s+!', ' ', $body);					// replace continuous space by one spaces
		$body = preg_replace('/[^A-Za-z0-9 _\-\+\&]/','',$body);	// delete non alpha numeric and _ - + & chars
		////$body = preg_replace( '/[^[:print:]]/', '', $body );
		$body = utf8_encode($body);

		$tagArray = [];
		$allWordsArray = explode( " ", $body);
		foreach($allWordsArray as $k => $v)
		{
			$v = trim($v);
			if(!(($v == '')||($v == ' ')))
			{
				if( isset($tagArray[$v]) )
				{
					$tagArray[$v]++;
				}
				else {
					$tagArray[$v] = 1;				
				}
			}
		}
		$insertData = [];
		foreach($tagArray as $word => $count)
		{
			$insertData[] = array('word' => $word, 'freq' => $count, 'landing_page_urls_id' => $landingpageid );
		}
		DB::table('landingpagewordcloud')->insert( $insertData );
		return Response::json($tagArray);
		
	}
	
	// Get landing page word cloud data
	public function getLandingPageWordCloud($landingpageid)
	{
		//return Response::json( $landingpageid );
		return Response::json( DB::table('landingpagewordcloud')->where('landing_page_urls_id', $landingpageid)->get() );
	}
	// Delete a particular landing page word cloud element (single word) by id
	public function deleteLandingPageWordCloudElement($landingpagewordcloudid)
	{
		return Response::json( DB::table('landingpagewordcloud')->where('id', $landingpagewordcloudid)->delete() );
	}
}
