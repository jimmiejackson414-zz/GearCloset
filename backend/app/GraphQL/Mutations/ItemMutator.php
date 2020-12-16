<?php

namespace App\GraphQL\Mutations;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\DB;
use App\Models\Item;

class ItemMutator
{
  /*
  * Remove item from category but keep in database
  */
  public function removeItem($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
  {
    $category_item = DB::table('category_item')
      ->where('category_id', $args['category_id'])
      ->where('item_id', $args['item_id'])
      ->delete();

    return Item::find($args['item_id']);
  }
}