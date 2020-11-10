<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CategoryItem extends Pivot
{
    protected $fillable = [
        'category_id', 'item_id', 'position'
    ];

    // public function category(): HasMany
    // {
    //     return $this->hasMany(Category::class);
    // }

    // public function item(): HasMany
    // {
    //     return $this->hasMany(Item::class);
    // }
}
