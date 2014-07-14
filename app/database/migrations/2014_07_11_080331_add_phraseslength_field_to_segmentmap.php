<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPhraseslengthFieldToSegmentmap extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('segmentmap', function(Blueprint $table)
		{
		    $table->integer('phraselength')->after('phrase');
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
		    $table->dropColumn('phraselength');	
		});
	}

}
