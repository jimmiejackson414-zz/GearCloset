<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    protected $fillable = [
        'name', 'pack_id'
    ];

    // automatically eager load items of a category
    protected $with = ['items'];

    // define relationships
    public function pack(): BelongsTo
    {
        return $this->belongsTo(Pack::class);
    }

    public function items(): BelongsToMany
    {
        return $this
            ->belongsToMany('App\Models\Item')
            ->withPivot('position')
            ->withTimestamps();
    }
}
