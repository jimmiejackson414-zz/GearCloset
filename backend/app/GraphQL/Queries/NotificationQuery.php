<?php

namespace App\GraphQL\Queries;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;

class NotificationQuery
{
    /**
     * Return all notifications associated with the current_user
     */
    public function find_by_user($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $user = $context->user();

        if ($user) {
            return $user->notifications()->get();
        }

        return [
            'notifications' => null
        ];
    }
}
