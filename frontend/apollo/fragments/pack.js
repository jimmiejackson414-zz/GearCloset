import { gql } from 'graphql-request';

export const PACK_FRAGMENT = gql`
  fragment pack on Pack {
    id
    name
    active
    theme
    user_id
    created_at
    updated_at
  }
`;
