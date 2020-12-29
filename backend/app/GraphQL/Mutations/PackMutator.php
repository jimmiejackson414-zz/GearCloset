<?php

namespace App\GraphQL\Mutations;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;
use App\Models\Pack;

class PackMutator
{
  /*
  * Reset pack to default, destroy categories but keep items
  */
  public function reset($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
  {
    $pack = Pack::find($args['id']);

    $pack->categories()->delete();

    return $pack;
  }
}