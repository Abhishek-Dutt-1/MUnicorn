<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBrandCompeteFieldsToWordcloudTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('wordcloud', function(Blueprint $table)
		{
		    $table->boolean('brand')->default(false)->after('segment');
		    $table->boolean('compete')->default(false)->after('brand');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('wordcloud', function(Blueprint $table)
		{
            $table->dropColumn('brand');
            $table->dropColumn('compete');
		});
	}

}
