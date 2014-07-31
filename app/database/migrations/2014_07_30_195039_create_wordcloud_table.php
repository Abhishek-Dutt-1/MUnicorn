<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWordcloudTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('wordcloud', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('word')->default(null)->nullable();
            $table->integer('freq')->default(0)->nullable();
            $table->string('segment')->default(null)->nullable();
            $table->boolean('negativeword')->default(false);
            $table->boolean('stopword')->default(false);
            $table->integer('numword');
            $table->integer('dataaccount')->default(0);
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
		Schema::drop('wordcloud');
	}

}
