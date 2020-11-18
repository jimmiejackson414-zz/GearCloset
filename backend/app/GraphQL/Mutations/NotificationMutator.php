<?php

namespace App\GraphQL\Mutations;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;

class NotificationMutator
{
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $user = $context->user();

        foreach ($user->notifications as $notification) {
            $notification->viewed = true;
            $notification->save();
        }

        $notifications = $user->notifications->toArray();

        return [
            'status' => 'Success',
            'notifications' => $notifications
        ];
    }
}
