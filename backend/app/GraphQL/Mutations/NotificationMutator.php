<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;

class NotificationMutator
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $user = \App\Models\User::find($args['id']);
        // $user = auth('api')->user();
        // $user = Auth::guard('api')->user();

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
