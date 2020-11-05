<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ForumPost;

class ForumPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ForumPost::insert([
            [
                'title' => 'FS: LightheartGear SoLong 6',
                'forum_subcategory_id' => 1,
                'user_id' => 1,
                'pinned' => false,
                'slug' => 'fs-lightheartgear-solong-6',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'FS: Snow Peak 900 Titanium Cookset',
                'forum_subcategory_id' => 1,
                'user_id' => 2,
                'pinned' => false,
                'slug' => 'fs-snow-peak-900-titanium-cookset',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'PINNED: This is a test pinned topic.',
                'forum_subcategory_id' => 1,
                'user_id' => 1,
                'pinned' => true,
                'slug' => 'pinned-this-is-a-test-pinned-topic',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Warbonnet Blackbird',
                'forum_subcategory_id' => 3,
                'user_id' => 3,
                'pinned' => false,
                'slug' => 'warbonnet-blackbird',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'MSR Access 1 Tent',
                'forum_subcategory_id' => 4,
                'user_id' => 3,
                'pinned' => false,
                'slug' => 'msr-access-1-tent',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
        ]);
    }
}
