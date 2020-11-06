<?php

namespace App\GraphQL\Queries;
use App\Models\ForumPost;

class ForumPostBySlug
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $post = \App\Models\ForumPost::findBySlug($args["slug"])->first();
        return $post;
    }
}
