<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ForumComment extends Model
{
    protected $fillable = [
        'user_id', 'text', 'forum_post_id'
    ];

    public function post(): belongsTo
    {
        return $this->belongsTo(ForumPost::class, 'forum_post_id');
    }

    public function user(): belongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
