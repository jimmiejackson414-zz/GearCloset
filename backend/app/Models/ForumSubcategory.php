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

    // Relationships
    public function category(): BelongsTo
    {
        return $this->belongsTo(ForumCategory::class, 'forum_category_id');
    }

    public function posts(): HasMany
    {
        return $this->hasMany(ForumPost::class);
    }

    // Scopes
    public function scopeFindBySlug($query, $slug)
    {
        return $query->whereSlug($slug);
    }
}
