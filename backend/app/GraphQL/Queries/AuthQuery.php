<?php

namespace App\GraphQL\Queries;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;

class AuthQuery
{
  public function find_bg_images($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
  {
    // $results = cloudinary()->resources(expression('folder:gear_closet/auth_pages')->execute());
    $results = cloudinary()->admin()->resources(
      array(
        "type" => "upload",
        "prefix" => "gear_closet/auth_pages"
      )
    );
    // dd($results['resources']);
    return $results['resources'];
  }
}