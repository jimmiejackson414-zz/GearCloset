<?php

namespace App\GraphQL\Mutations;

use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;
use App\Models\ForumPost;
use App\Models\ForumComment;

class ForumMutator
{
  /*
  * Create Forum Post and nested Forum Comment
  */
  public function createPost($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
  {
    $user = $context->user();

    $post = ForumPost::create([
      'title' => $args['title'],
      'forum_subcategory_id' => $args['forum_subcategory_id'],
      'user_id' => $user->id,
      'pinned' => $args['pinned'],
    ]);

    $comment = ForumComment::create([
      'user_id' => $user->id,
      'forum_post_id' => $post->id,
      'text' => $args['text']
    ]);

    return $post;
  }
}