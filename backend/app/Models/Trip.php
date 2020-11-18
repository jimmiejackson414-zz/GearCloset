<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Trip extends Model
{
    protected $fillable = [
        'name', 'description', 'owner_id'
    ];

    // automatically eager load todos and shopping_list_items
    protected $with = [
        'todos', 'shopping_list_items', 'users'
    ];

    // define relationships
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function shopping_list_items(): HasMany
    {
        return $this->hasMany(ShoppingListItem::class);
    }

    public function todos(): HasMany
    {
        return $this->hasMany(Todo::class);
    }
}
