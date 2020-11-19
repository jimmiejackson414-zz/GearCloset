<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Todo extends Model
{
    protected $fillable = [
        'title', 'checked', 'trip_id'
    ];

    // define relationships
    public function trip(): BelongsTo
    {
        $this->belongsTo(Trip::class);
    }
}
