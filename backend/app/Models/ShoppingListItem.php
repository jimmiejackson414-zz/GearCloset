<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShoppingListItem extends Model
{
    protected $fillable = [
        'title', 'checked', 'trip_id', 'quantity'
    ];

    // define relationships
    public function trip(): BelongsTo
    {
        return $this->belongsTo(Trip::class);
    }
}
