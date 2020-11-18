<?php

namespace App\GraphQL\Queries;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;

class TripsQuery
{
    public function find_by_user($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $user = $context->user();
        if ($user) {
            // all trip friends, shopping_list_items and todos automatically eager loaded on the model
            return $user->trips()->get();
        }
        return null;
    }
}
