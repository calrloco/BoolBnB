<?php

use App\Service;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        for($i = 0; $i < 7; $i++){
            $newService = new Service;
            $newService->service = $faker->word;
            $newService->save();
        }
    }
}
