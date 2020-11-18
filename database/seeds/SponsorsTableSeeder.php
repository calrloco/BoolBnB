<?php

use App\Sponsor;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;

class SponsorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sponsor = ['sponsor1', 'sponsor3', 'sponsor6'];
        $sponsor_time = [24, 72, 144];
        for($i = 0; $i < count($sponsor); $i++){
            $newSponsor = new Sponsor;
            $newSponsor->sponsor = $sponsor[$i];
            $newSponsor->sponsor_price = 7;
            $newSponsor->sponsor_time = $sponsor_time[$i];
            $newSponsor->save();
        }
    }
}
