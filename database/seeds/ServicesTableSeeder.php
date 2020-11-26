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
        $services = [
            'Wi-Fi',
            'parcheggio',
            'vasca da bagno',
            'riscaldamento',
            'cucina',
            'happy handing'
        ];

        $descriptions = [
            'servizio Wi-Fi gratuito', 
            'parcheggio gratuito riservato', 
            'l\'appartamento dispone di una vasca da bagno',
            'riscaldamento autonomo',
            'appartamento dotato di cucina',
            ':)'
        ];

        $icons = [
            'fas fa-wifi',
            'fas fa-parking',
            'fas fa-bath',
            'fas fa-temperature-high',
            'fas fa-utensils',
            'fas fa-hand-rock',
        ];
        

        for($i = 0; $i < count($services); $i++){
            $newService = new Service;
            $newService->service = $services[$i];
            $newService->description = $descriptions[$i];
            $newService->icon = $icons[$i];
            $newService->save();
        }
    }
}
