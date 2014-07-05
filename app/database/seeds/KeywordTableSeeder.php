<?php

class KeywordTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('keywords')->delete();

        Keyword::create(array(

            'adGroup' => 'Online Dish',
            'Keyword' => 'dish tv online',
            'currency' => 'INR',
            'avMonthlySearches' => 10,
            'competition' => 0.89,
            'suggestedBid' => 12.86,
            'impressionShare' => 0.000,
            'inAccount' => 'N',
            'inPlan' => 'N',
            'extractedFrom' => ''

        ));
        Keyword::create(array(

            'adGroup' => 'Online Dish',
            'keyword' => 'dish tv online recharge',
            'currency' => 'INR',
            'avMonthlySearches' => 320,
            'competition' => 0.23,
            'suggestedBid' => 6.80,
            'impressionShare' => 0.000,
            'inAccount' => 'N',
            'inPlan' => 'N',
            'extractedFrom' => ''

        ));
        Keyword::create(array(

            'adGroup' => 'Online Dish',
            'Keyword' => 'dish tv recharge online',
            'currency' => 'INR',
            'avMonthlySearches' => 70,
            'competition' => 0.51,
            'SuggestedBid' => 10.23,
            'impressionShare' => 0.000,
            'inAccount' => 'N',
            'inPlan' => 'N',
            'extractedFrom' => ''

        ));

    }
}
