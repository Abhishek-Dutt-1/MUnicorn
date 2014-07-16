<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveDeleteflagFromKeywords extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('keywords', function(Blueprint $table)
		{
			$table->dropColumn('deleteflag');
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
			$table->boolean('deleteflag')->default(TRUE);
		});
	}

}
