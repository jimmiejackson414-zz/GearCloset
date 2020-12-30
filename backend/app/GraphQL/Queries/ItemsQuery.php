<?php

namespace App\GraphQL\Queries;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;

class ItemsQuery
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function find_by_user($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $user = $context->user();
        if ($user) {
            return $user
                ->packs()
                ->categories()
                ->items()
                ->get();
        }
    }
}
