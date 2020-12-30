<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ForumComment;

class ForumCommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ForumComment::insert([
            [
                'user_id' => 1,
                'forum_post_id' => 1,
                'text' => 'Selling a 2016 Lightheart Gear SoLong 6',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'user_id' => 2,
                'forum_post_id' => 1,
                'text' => 'What kind of condition is it?',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'user_id' => 3,
                'forum_post_id' => 1,
                'text' => 'PMed',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'user_id' => 2,
                'forum_post_id' => 2,
                'text' => 'Selling a Snow Peak 900 Titanium Cookset. $40.',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'user_id' => 1,
                'forum_post_id' => 3,
                'text' => 'This is a test of your emergency broadcast system.',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'user_id' => 3,
                'forum_post_id' => 3,
                'text' => 'This is a bunch of copy about the Warbonnet Blackbird.',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'user_id' => 3,
                'forum_post_id' => 4,
                'text' => 'This is a bunch of copy about the MSR Access 1 Tent.',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'user_id' => 1,
                'forum_post_id' => 4,
                'text' => 'Yes, I agree.',
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ]
        ]);
    }
}
