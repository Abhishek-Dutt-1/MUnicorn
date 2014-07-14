<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCurrentkeywordflagToSegmentmap extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('segmentmap', function(Blueprint $table)
		{
		    $table->integer('Current_Keyword_Flag')->default(1);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('segmentmap', function(Blueprint $table)
		{
			    $table->dropColumn('Current_Keyword_Flag');
		});
	}

}
