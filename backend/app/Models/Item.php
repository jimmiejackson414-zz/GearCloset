<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    protected $fillable = [
        'name', 'weight', 'price', 'generic_type', 'category_id', 'consumable', 'worn', 'quantity'
    ];

    public function categories_items(): HasMany
    {
        return $this->hasMany(CategoriesItem::class);
    }
}
