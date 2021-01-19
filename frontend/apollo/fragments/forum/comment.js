import { gql } from 'graphql-request';

export const COMMENT_FRAGMENT = gql`
  fragment comment on ForumComment {
    id
    user_id
    forum_post_id
    text
    created_at
    updated_at
  }
`;
