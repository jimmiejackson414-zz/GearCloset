<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Str;

class UserMutator
{
  public function create($root, array $args)
  {
    $token = Str::random(60);
    $user = new \App\Models\User($args);
    $user->api_token = $token;
    $user->save();

    return [
      'me' => $user,
      'token' => $token
    ];
  }
}