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
			
			$table->string('adGroup')->default(null)->nullable();
            $table->string('keyword')->default(null)->nullable();
            $table->string('currency')->default(null)->nullable();
            $table->integer('avMonthlySearches')->default(null)->nullable();
            $table->float('competition')->default(null)->nullable();
            $table->float('suggestedBid')->default(null)->nullable();
            $table->float('impressionShare')->default(null)->nullable();
            $table->string('inAccount')->default(null)->nullable();
            $table->string('inPlan')->default(null)->nullable();
            $table->string('extractedFrom')->default(null)->nullable();
			
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
