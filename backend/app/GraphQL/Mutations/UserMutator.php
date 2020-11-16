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

  public function updateAvatar($rootValue, array $args)
  {
    // Set user, file, and options variables
    $user = \App\Models\User::find($args['id']);
    $file = $args['file'];
    $context = array("user_id" => $user->id);

    // Upload to Cloudinary/gear_closet folder, and attach user_id to metadata
    $avatar_url = cloudinary()->upload($args['file'], array("folder" => "gear_closet", "context" => $context))->getSecurePath();

    // Save returned url to database on user and save
    $user->avatar_url = $avatar_url;
    $user->save();

    return $user;
  }
}