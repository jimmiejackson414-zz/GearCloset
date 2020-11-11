<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Auth;

class PacksQuery
{
    // TODO: return all currentUser's pack along with categories and items. Need to append category_item position to item object
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
