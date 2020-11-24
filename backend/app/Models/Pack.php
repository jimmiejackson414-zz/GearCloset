<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Pack extends Model
{
    protected $fillable = [
        'name', 'user_id', 'active', 'created_at', 'updated_at'
    ];

    // automatically eager load categories of a pack
    protected $with = [
        'categories'
    ];

    // define relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function items(): HasManyThrough
    {
        return $this->hasManyThrough('App\Models\Item', 'App\Models\Category');
    }

    public function trip(): BelongsTo
    {
        return $this->belongsTo(Trip::class);
    }
}
