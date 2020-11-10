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
            // $packs = $user->packs()->get();
            // $packs->$categories()->orderBy('position', 'desc')->get();
            // return $packs;
            // return $packs::with("categories.category_items.item")->get();

            // grab user's packs & eager load categories, category_items and item
            // $packs = $user::with("packs.categories.category_items.item")->get();

            // all pack items and categories are automatically eager loaded on the model
            return $user->packs()->get();
        }
        return [];
    }
}
