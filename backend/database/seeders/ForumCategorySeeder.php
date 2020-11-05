<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ForumCategory;

class ForumCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ForumCategory::insert([
            [
                'title' => 'Commerce',
                'description' => 'Forums related to the buying and selling of gear.',
                'slug' => 'commerce',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Gear Talk',
                'description' => 'Have a question about a piece of gear? Ask it here!',
                'slug' => 'gear-talk',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'General',
                'description' => 'Focuses on a particular style or subgenre of lightweight backpacking.',
                'slug' => 'general',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
        ]);
    }
}
