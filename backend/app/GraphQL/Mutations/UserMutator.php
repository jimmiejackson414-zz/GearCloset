<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Str;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;
use App\Models\TripUser;

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
    dd($args['input'][0]['trip_id']['connect']); #returns trip_id but in a shitty way

    if (!$user) {
      return null;
    }

    foreach ($args as $friend) {
      # if $friend is already a connection
      if (gettype($friend) === object) {
        $trip_user = new TripUser;
        $trip_user->trip_id = $args['trip_id'];
        $trip_user->user_id = $friend->id;
        $trip_user->save();

      # if $friend is someone new to invite via email
      } else {
        # Create Friend
        // $new_friend = new User;

        #Create Friend User
        // $friend_user = new FriendUser;
        // $friend_user->user_id = $user->id;
        // $friend_user->friend_id = $friend->id;

        # TODO: Send Email to user(s)
      }
    }
    return $user->friends()->get();
  }
}