<?php

// app/models/Keyword.php

class Keyword extends Eloquent {

    protected $table = 'keywords';      // not really needed due to defaults

    protected $fillable = array('keyword', 'deleteflag', 'dataAccount');     //make keyword field mass-assignable

}
