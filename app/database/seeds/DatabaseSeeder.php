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
        $this->command->info('Keyword seeded');

        $this->call('StopwordTableSeeder');
        $this->command->info('Stopword seeded');

        $this->call('NegativekeywordTableSeeder');
        $this->command->info('NegativeKeyword seeded');

		// $this->call('UserTableSeeder');
	}

}
