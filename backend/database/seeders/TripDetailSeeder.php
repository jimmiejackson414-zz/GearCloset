<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TripDetail;

class TripDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TripDetail::insert([
            [
                'title' => 'Flight 1',
                'url' => 'https://www.southwest.com',
                'value' => 'SW436',
                'type' => 'trip',
                'trip_id' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Flight 2',
                'url' => 'https://www.southwest.com',
                'value' => 'SW38',
                'type' => 'trip',
                'trip_id' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Car Rental',
                'url' => 'https://www.avis.com',
                'value' => 'Avis',
                'type' => 'trip',
                'trip_id' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Food Drop',
                'url' => 'https://www.standingbearhostel.com',
                'value' => 'Standing Bear Hostel',
                'type' => 'trip',
                'trip_id' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Hostel',
                'url' => 'https://www.blackrockhostel.com',
                'value' => 'Black Rock Hostel',
                'type' => 'trip',
                'trip_id' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Miles',
                'url' => null,
                'value' => '211 Miles',
                'type' => 'hike',
                'trip_id' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Avg Time To Hike',
                'url' => null,
                'value' => '21 Days',
                'type' => 'hike',
                'trip_id' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Elevation Gain',
                'url' => null,
                'value' => '164,200 ft.',
                'type' => 'hike',
                'trip_id' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Trail Type',
                'url' => null,
                'value' => 'End to End',
                'type' => 'hike',
                'trip_id' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
            [
                'title' => 'Website',
                'url' => 'https://www.jmt.org',
                'value' => 'https://www.jmt.org',
                'type' => 'hike',
                'trip_id' => 1,
                'created_at' => \Carbon\Carbon::now(),
                'updated_at' => \Carbon\Carbon::now(),
            ],
        ]);
    }
}
