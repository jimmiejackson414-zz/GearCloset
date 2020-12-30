<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pack;

class PackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Pack::insert([
            [
                'name' => 'Summer',
                'user_id' => 1,
                'active' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'name' => 'Winter',
                'user_id' => 1,
                'active' => 0,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ]
        ]);
    }
}
