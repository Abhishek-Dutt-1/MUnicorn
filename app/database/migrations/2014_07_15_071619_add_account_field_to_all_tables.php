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
			$table->integer('dataAccount')->default(0);
		});
		Schema::table('stopwords', function(Blueprint $table)
		{
			$table->integer('dataAccount')->default(0);
		});
		Schema::table('negativekeywords', function(Blueprint $table)
		{
			$table->integer('dataAccount')->default(0);
		});
		Schema::table('segmentmap', function(Blueprint $table)
		{
			$table->integer('dataAccount')->default(0);
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
