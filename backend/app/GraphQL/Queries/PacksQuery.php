<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Auth;

class PacksQuery
{
    public function find_by_user()
    {
        $user = Auth::guard('api')->user();
        if ($user) {
            $packs = $user->packs()->get();
            $packs->$items()->orderBy('position', 'desc')->get();
            return $packs;
        }
        return [];
    }
}