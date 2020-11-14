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

  public function updateAvatar($root, array $args)
  {
    $user = \App\Models\User::find($args['id']);
    $file = $args['avatar'];
    $avatar_url = cloudinary()->upload($request->file($file)->getRealPath())->getSecurePath();
    dd($avatar_url);
    $user->avatar_url = $avatar_url;
    $user->save();

    return [
      'user' => $user
    ];
  }
}