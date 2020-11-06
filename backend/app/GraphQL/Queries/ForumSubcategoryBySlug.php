<?php

namespace App\GraphQL\Queries;
use App\Models\ForumSubcategory;

class ForumSubcategoryBySlug
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $category = \App\Models\ForumSubcategory::findBySlug($args["slug"])->first();
        return $category;
    }
}
