<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Str;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;
use App\Models\TripUser;
use App\Models\Trip;

class UserMutator
{
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

  public function addFriends($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
  {
    $user = $context->user();

    if (!$user) {
      return null;
    }

    foreach ($args['input'] as $friend) {
      # if $friend is already a connection
      if (gettype($friend) === 'array') {
        TripUser::firstOrCreate(['trip_id' => $args['trip_id'], 'user_id' => $friend['id']]);
        // $trip_user = new TripUser;
        // $trip_user->trip_id = $args['trip_id'];
        // $trip_user->user_id = $friend['id'];
        // $trip_user->save();

      # if $friend is someone new to invite via email
      } else {
        # TODO: Send Email to user(s)
      }
    }

    $trip = Trip::find($args['trip_id']);
    return $trip->users()->get();
  }
}