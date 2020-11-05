<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ForumSubcategory;

class ForumSubcategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ForumSubcategory::insert([
            [
                'title' => 'Gear Swap',
                'forum_category_id' => 1,
                'slug' => 'gear-swap',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Gear Deals',
                'forum_category_id' => 1,
                'slug' => 'gear-deals',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Reader Reviews',
                'forum_category_id' => 1,
                'slug' => 'reader-reviews',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Gear (General)',
                'forum_category_id' => 2,
                'slug' => 'gear-general',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Gear Lists',
                'forum_category_id' => 2,
                'slug' => 'gear-lists',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'MYOG (Make Your Own Gear)',
                'forum_category_id' => 2,
                'slug' => 'myog',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Multiple Use Gear',
                'forum_category_id' => 2,
                'slug' => 'multiple-use-gear',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Environmental Issues',
                'forum_category_id' => 3,
                'slug' => 'environmental-issues',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Speed Hiking and Fastpacking',
                'forum_category_id' => 3,
                'slug' => 'speed-hiking-and-fastpacking',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Super Ultralight (SUL)',
                'forum_category_id' => 3,
                'slug' => 'super-ultralight',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Hammock Camping',
                'forum_category_id' => 3,
                'slug' => 'hammock-camping',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Winter Hiking',
                'forum_category_id' => 3,
                'slug' => 'winter-hiking',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ]
        ]);
    }
}
