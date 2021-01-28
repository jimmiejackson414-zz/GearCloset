import { gql } from 'graphql-request';

export const SUBCATEGORY_FRAGMENT = gql`
  fragment subcategory on ForumSubcategory {
    id
    title
    forum_category_id
    slug
    created_at
    updated_at
  }
`;
