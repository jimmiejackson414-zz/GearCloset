<?php

namespace App\GraphQL\Queries;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;

class PacksQuery
{
    public function find_by_user($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $user = $context->user();
        if ($user) {
            // all pack items and categories are automatically eager loaded on the model
            return $user->packs()->get();
        }
        return [];
    }
}
