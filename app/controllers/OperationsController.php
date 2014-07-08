<?php

class OperationsController extends \BaseController {

    // delete stop words
    public function deleteStopWords()
    {
        //$keyword = DB::table('keywords')->where('keyword', 'like', '%online%')->get();
        //$keyword = DB::update('update keywords set keyword = 100 where id = ?', array('1'));
        //$keyword = DB::update( 'update keywords set keyword = replace(keyword, "tv", "REPLACED")' );
        //$keyword = DB::table('keywords')->where('id', 1)->update(array('keyword' => 1));
        
        //////////////////// Impliment stop word deletion here
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

}
