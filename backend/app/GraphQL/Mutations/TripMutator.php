<?php

namespace App\GraphQL\Mutations;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;
use App\Models\Trip;

class TripMutator
{
  /*
  * Set selected pack for the trip
  */
  public function setSelectedPack($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
  {
    $trip = Trip::find($args['trip_id']);
    $trip->pack_id = $args['pack_id'];
    $trip->save();

    return $trip;
  }
}