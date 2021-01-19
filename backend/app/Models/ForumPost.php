<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Cviebrock\EloquentSluggable\Sluggable;

class ForumPost extends Model
{
    use Sluggable;

    protected $fillable = [
        'title', 'forum_subcategory_id', 'user_id', 'pinned', 'slug', 'comments'
    ];

    // Relationships
    public function comments(): HasMany
    {
        return $this->hasMany(ForumComment::class);
    }

    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(ForumSubcategory::class, "forum_subcategory_id");
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Scopes
    public function scopeFindBySlug($query, $slug)
    {
        return $query->whereSlug($slug);
    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => [ 'title', 'id' ]
            ]
        ];
    }
}
