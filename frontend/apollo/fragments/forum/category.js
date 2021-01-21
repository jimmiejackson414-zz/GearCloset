import { gql } from 'graphql-request';

export const CATEGORY_FRAGMENT = gql`
  fragment category on ForumCategory {
    id
    title
    description
    slug
    created_at
    updated_at
  }
`;
