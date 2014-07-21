<?php

// app/models/Keyword.php

class Keyword extends Eloquent {

    protected $table = 'keywords';      // not really needed due to defaults

    //protected $fillable = array('keyword', 'deleteflag', 'dataAccount');     //make keyword field mass-assignable
	
	protected $fillable = array('adGroup', 'keyword', 'currency', 'avMonthlySearches', 'competition', 'suggestedBid', 'impressionShare', 'inAccount', 'inPlan', 'extractedFrom');
}
