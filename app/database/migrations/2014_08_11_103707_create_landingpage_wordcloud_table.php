<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLandingpageWordcloudTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('landingpagewordcloud', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('word');
			$table->integer('freq');
			$table->integer('landing_page_urls_id');
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
		Schema::drop('landingpagewordcloud');
	}

}
