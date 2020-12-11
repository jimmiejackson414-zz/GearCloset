<?php

namespace App\GraphQL\Queries;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;

class UserQuery
{
  /*
  * Return current user
  */
  public function me($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
  {
    return $context->user();
  }

  /*
  * Example of paginate function
  */
  public function paginate($root, array $args)
  {
    return \App\User::query()->paginate(
      $args['count'],
      ['*'],
      'page',
      $args['page']
    );
  }

  /*
  * Return all of a user's friends
  */
  public function friends($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
  {
    $user = $context->user();

    if (!$user) {
      return [];
    }

    return $user->friends()->get();
  }


}