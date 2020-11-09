<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        'name', 'pack_id'
    ];

    public function pack(): BelongsTo
    {
        return $this->belongsTo(Pack::class);
    }

    public function categories_items(): HasMany
    {
        return $this->hasMany(CategoriesItem::class);
    }

    public function items(): HasManyThrough
    {
        return $this->hasManyThrough('App\Models\Category', 'App\Models\CategoriesItem');
    }
}
