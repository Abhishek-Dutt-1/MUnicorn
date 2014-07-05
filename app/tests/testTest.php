<?php

class test1 extends TestCase {

	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testBasicExample()
	{
        $response = $this->call('GET', '/');
        $this->assertResponseOk();
/*        $response = $this->call('GET', '/api/keywords/2/1');
        $this->assertResponseOk();
 */
	}

}
