<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Auth;

class NotificationQuery
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function find_by_user()
    {
        $user = Auth::guard('api')->user();
        if ($user) {
            return $user->notifications()->get();
        }
    }
}
