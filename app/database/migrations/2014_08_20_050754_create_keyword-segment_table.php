<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKeywordSegmentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('keywords_segment', function(Blueprint $table)
		{
			$table->increments('id');
			
			$table->string('adGroup')->default(null)->nullable();
            $table->string('keyword')->default(null)->nullable();
			$table->mediumText('lpscore')->default(null)->nullable();
            $table->string('currency')->default(null)->nullable();
            $table->integer('avMonthlySearches')->default(null)->nullable();
            $table->float('competition')->default(null)->nullable();
            $table->float('suggestedBid')->default(null)->nullable();
            $table->float('impressionShare')->default(null)->nullable();
            $table->string('inAccount')->default(null)->nullable();
            $table->string('inPlan')->default(null)->nullable();
            $table->string('extractedFrom')->default(null)->nullable();
			
			$table->string('segment')->default(null)->nullable();
			$table->boolean('brand')->default(false)->nullable();
		    $table->boolean('compete')->default(false)->nullable();
			$table->integer('dataAccount')->nullable()->default(0);
			
			//$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('keywords_segment');
	}

}
