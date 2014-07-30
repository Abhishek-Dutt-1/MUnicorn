<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUserSegmentFieldToKeywords extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('keywords', function(Blueprint $table)
		{
			$table->string('usersegment')->after('keyword')->default(null)->nullable();
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
			$table->dropColumn('usersegment');	
		});
	}

}
