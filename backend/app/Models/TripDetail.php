<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TripDetail extends Model
{
    protected $fillable = [
        'title', 'url', 'value', 'type', 'trip_id'
    ];

    // define relationships
    public function trip(): BelongsTo
    {
        return $this->belongsTo(Trip::class);
    }
}
