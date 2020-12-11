<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ShoppingListItem;

class ShoppingListItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ShoppingListItem::insert([
            [
                'title' => 'SmartWater Bottles',
                'checked' => 0,
                'trip_id' => 1,
                'quantity' => 2,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Beef Jerkey',
                'checked' => 1,
                'trip_id' => 1,
                'quantity' => 2,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Sport Beans',
                'checked' => 1,
                'trip_id' => 1,
                'quantity' => 4,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Ramen',
                'checked' => 0,
                'trip_id' => 1,
                'quantity' => 2,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Snickers Bars',
                'checked' => 0,
                'trip_id' => 1,
                'quantity' => 2,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
        ]);
    }
}
