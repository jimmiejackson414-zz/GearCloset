<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Str;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;
use App\Models\TripUser;
use App\Models\Trip;
use App\Models\User;

class UserMutator
{
  /*
  * Update user avatar
  */
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

  /*
  * Invite array of friends to a trip from the planning page
  */
  public function addFriends($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
  {
    $user = $context->user();

    if (!$user) {
      return null;
    }

    foreach ($args['input'] as $friend) {
      # if $friend is already a connection
      if (isset($friend['id'])) {
        TripUser::firstOrCreate([
          'trip_id' => $args['trip_id'],
          'user_id' => $friend['id']
        ]);

      # if $friend is someone new to invite via email
      } else {
        # TODO: Send Email to user(s)
        $new_user = new User;
        $new_user->email = $friend['email'];
        $new_user->pending_invite = true;
        $new_user->save();

        # TODO: Create new TripUser when invited user registers
        // $new_trip_user = new TripUser;
        // $new_trip_user->trip_id = $args['trip_id'];
        // $new_trip_user->user_id = $new_user->id;
        // $new_trip_user->save();
      }
    }

    $trip = Trip::find($args['trip_id']);
    return $trip->users()->get();
  }
}