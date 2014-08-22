<?php

// app/models/Keyword.php

class LandingPageUrl extends Eloquent {

    protected $table = 'landingpageurls';      // not really needed due to defaults

	protected $guarded = array('id');
	
	// one to many relation
	public function dataAccount()
	{
		return $this->belongsTo('DataAccount');
	}

}
