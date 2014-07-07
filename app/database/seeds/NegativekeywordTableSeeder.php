<?php

class NegativekeywordTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('negativekeywords')->delete();

        Negativekeyword::create( array( 'negativekeyword' => 'www' ));
        Negativekeyword::create( array( 'negativekeyword' => '3g' ));
    }



}
