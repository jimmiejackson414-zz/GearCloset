<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ForumPost extends Model
{
    protected $fillable = [
        'title', 'forum_subcategory_id', 'user_id', 'pinned', 'slug', 'comments'
    ];

    public function comments(): HasMany
    {
        return $this->hasMany(ForumComment::class);
    }

    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(ForumSubcategory::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
