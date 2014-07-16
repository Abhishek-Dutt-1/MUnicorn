<?php

// app/models/Keyword.php

class DataAccount extends Eloquent {

    protected $table = 'dataaccounts';      // not really needed due to defaults

    protected $fillable = array('dataaccount', 'user');     //make keyword field mass-assignable

}
