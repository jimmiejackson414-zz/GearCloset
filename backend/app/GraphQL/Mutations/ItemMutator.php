<?php

namespace App\GraphQL\Mutations;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\DB;
use App\Models\Category;
use App\Models\Item;

class ItemMutator
{
  /*
  * Create Item and CategoryItem records
  */
  public function createItem($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
  {
    unset($args['directive']);
    $item = new Item();
    foreach ($args as $key => $value) {
      $item->$key = $value;
    }
    $item->save();

    $itemsLength = count(Category::find($args['category_id'])->items) + 1;
    $item->categories()->attach($args['category_id'], ['position' => $itemsLength]);

    return $item;
  }

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

  /*
  * Update item position
  */
  public function updatePosition($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
  {
    dd('Need to write this function');
  }
}