<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Auth;

class PacksQuery
{
    public function find_by_user()
    {
        $user = Auth::guard('api')->user();
        if ($user) {
            // return $user->packs()->with("categories")->get();
            return $user->packs()->get();
        }
        return [];
    }
}
