<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ForumCategory extends Model
{
    protected $fillable = [
        'title', 'description', 'slug'
    ];

    public function subcategories(): HasMany
    {
        return $this->hasMany(ForumSubcategory::class);
    }
}
