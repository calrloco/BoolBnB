<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
<<<<<<< Updated upstream
            // RolesTableSeeder::class,
            // UsersTableSeeder::class,
            // ApartmentsTableSeeder::class,
            // ServicesTableSeeder::class,
            // ImagesTableSeeder::class,           
            // SponsorsTableSeeder::class,           
=======
            RolesTableSeeder::class,
            UsersTableSeeder::class,
            ApartmentsTableSeeder::class,
            ServicesTableSeeder::class,
            ImagesTableSeeder::class,
            SponsorsTableSeeder::class,
>>>>>>> Stashed changes
            MessagesTableSeeder::class,
            ViewsTableSeeder::class,
        ]);
    }
}
