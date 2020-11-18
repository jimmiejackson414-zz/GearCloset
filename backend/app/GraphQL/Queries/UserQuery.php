<?php

namespace App\GraphQL\Queries;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;

class UserQuery
{
  public function me($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
  {
    return $context->user();
  }

  public function paginate($root, array $args)
  {
    return \App\User::query()->paginate(
      $args['count'],
      ['*'],
      'page',
      $args['page']
    );
  }
}