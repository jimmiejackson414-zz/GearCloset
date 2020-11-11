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

    // automatically eager load items of a category
    protected $with = ['items'];

    // define relationships
    public function pack(): BelongsTo
    {
        return $this->belongsTo(Pack::class);
    }

    public function category_items(): HasMany
    {
        return $this->hasMany(CategoryItem::class);
    }

    public function items(): BelongsToMany
    {
        return $this
            ->belongsToMany('App\Models\Item', 'category_item', 'item_id', 'category_id')
            ->using('App\Models\CategoryItem')
            ->withPivot(['position'])
            ->withTimestamps();
    }
}
