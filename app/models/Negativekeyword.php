<?php


class Negativekeyword extends Eloquent {

    protected $table = 'negativekeywords';      // not really needed due to defaults

    protected $fillable = array('negativekeyword');     //make keyword field mass-assignable

}
