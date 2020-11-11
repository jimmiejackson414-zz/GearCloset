<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Auth;

class PacksQuery
{
    public function find_by_user()
    {
        $user = Auth::guard('api')->user();
        if ($user) {
            // all pack items and categories are automatically eager loaded on the model
            return $user->packs()->get();
        }
        return [];
    }
}
