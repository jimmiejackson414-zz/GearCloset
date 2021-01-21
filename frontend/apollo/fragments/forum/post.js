import { gql } from 'graphql-request';

export const POST_FRAGMENT = gql`
  fragment post on ForumPost {
    id
    title
    forum_subcategory_id
    user_id
    pinned
    slug
    created_at
    updated_at
  }
`;
