<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    protected $fillable = [
        'name', 'pack_id'
    ];

    public function pack(): BelongsTo
    {
        return $this->belongsTo(Pack::class);
    }

    // public function items(): BelongsToMany
    // {
    //     return $this->belongsToMany(Item::class);
    // }
}
