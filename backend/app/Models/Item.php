<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Item extends Model
{
    protected $fillable = [
        'name', 'weight', 'price', 'generic_type', 'category_id', 'consumable', 'worn', 'quantity'
    ];

    // define relationships
    public function categories(): BelongsToMany
    {
        return $this
            ->belongsToMany('App\Models\Category', 'category_items', 'item_id', 'category_id')
            ->using('App\Models\CategoryItem')
            ->withPivot(['position'])
            ->withTimestamps();
    }

    public function category_item(): BelongsTo
    {
        return $this->belongsTo('App\Models\CategoryItem');
    }
}
