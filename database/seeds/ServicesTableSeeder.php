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
        services = [
            'Wi-Fi',
            'parcheggio',
            'vasca da bagno',
            'fas fa-temperature-high'
        ];
        descriptions = [
            'servizio Wi-Fi gratuito', 
            'parcheggio gratuito', 
            'l\'appartamento dispone di una vasca da bagno',
            ''
        ];
        icons = [
            'fas fa-wifi',
            'fas fa-parking',
            'fas fa-bath'
        ];
        

        for($i = 0; $i < 7; $i++){
            $newService = new Service;
            $newService->service = $faker->word;
            $newService->description = $faker->text;
            $newService->icon = "fas fa-star";
            $newService->save();
        }
    }
}
