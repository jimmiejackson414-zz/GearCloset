<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Str;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;

class UserMutator
{
  // public function create($root, array $args)
  // {
  //   $token = Str::random(60);
  //   $user = new \App\Models\User($args);
  //   $user->api_token = $token;
  //   $user->save();

  //   return [
  //     'me' => $user,
  //     'token' => $token
  //   ];
  // }

  public function updateAvatar($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
  {
    // Set user, file, and options variables
    $user = $context->user();
    $file = $args['file'];
    $options = array("user_id" => $user->id);

    // Upload to Cloudinary/gear_closet folder, and attach user_id to metadata
    $avatar_url = cloudinary()->upload($args['file'], array("folder" => "gear_closet", "context" => $options))->getSecurePath();

    // Save returned url to database on user and save
    $user->avatar_url = $avatar_url;
    $user->save();

    return $user;
  }
}