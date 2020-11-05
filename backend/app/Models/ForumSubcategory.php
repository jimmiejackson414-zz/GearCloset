<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ForumSubcategory extends Model
{
    protected $fillable = [
        'title', 'forum_category_id', 'slug'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ForumCategory::class);
    }

    public function posts(): HasMany
    {
        return $this->hasMany(ForumPost::class);
    }
}
