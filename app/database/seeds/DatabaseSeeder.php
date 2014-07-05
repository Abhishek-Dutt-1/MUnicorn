<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

        $this->call('KeywordTableSeeder');
        $this->command->info('KeywordTableSeeder seeded');
		// $this->call('UserTableSeeder');
	}

}
