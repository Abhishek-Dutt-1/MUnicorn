<?php

class StopwordTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('stopwords')->delete();

        Stopword::create( array( 'stopword' => 'a' ));
        Stopword::create( array( 'stopword' => 'an' ));
        Stopword::create( array( 'stopword' => 'the' ));
        Stopword::create( array( 'stopword' => 'on' ));
    }
}
