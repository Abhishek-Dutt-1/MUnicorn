<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKeywordsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('keywords', function(Blueprint $table)
		{
			$table->increments('id');
			
			$table->string('adGroup');
            $table->string('keyword');
            $table->string('currency');
            $table->integer('avMonthlySearches');
            $table->float('competition');
            $table->float('suggestedBid');
            $table->float('impressionShare');
            $table->string('inAccount');
            $table->string('inPlan');
            $table->string('extractedFrom');
			
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('keywords');
	}

}
