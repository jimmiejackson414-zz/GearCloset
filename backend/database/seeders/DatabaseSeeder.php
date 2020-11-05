<?php

namespace Database\Seeders;

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
        $this->call(ForumCategorySeeder::class);
        $this->call(ForumSubcategorySeeder::class);
        $this->call(ForumPostSeeder::class);
        $this->call(ForumCommentSeeder::class);
        $this->call(UserSeeder::class);
    }
}
