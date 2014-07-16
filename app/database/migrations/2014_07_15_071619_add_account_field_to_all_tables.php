<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAccountFieldToAllTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('keywords', function(Blueprint $table)
		{
			$table->integer('dataAccount');
		});
		Schema::table('stopwords', function(Blueprint $table)
		{
			$table->integer('dataAccount');
		});
		Schema::table('negativekeywords', function(Blueprint $table)
		{
			$table->integer('dataAccount');
		});
		Schema::table('segmentmap', function(Blueprint $table)
		{
			$table->integer('dataAccount');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('keywords', function(Blueprint $table)
		{
			$table->dropColumn('dataAccount');
		});
		Schema::table('stopwords', function(Blueprint $table)
		{
			$table->dropColumn('dataAccount');
		});
		Schema::table('negativekeywords', function(Blueprint $table)
		{
			$table->dropColumn('dataAccount');
		});
		Schema::table('segmentmap', function(Blueprint $table)
		{
			$table->dropColumn('dataAccount');
		});
	}

}
