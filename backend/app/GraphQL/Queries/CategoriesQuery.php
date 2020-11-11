<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Auth;

class CategoriesQuery
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function find_by_user()
    {
        $user = Auth::guard('api')->user();
        if ($user) {
            return $user->packs()->categories()->get();
        }
    }
}
