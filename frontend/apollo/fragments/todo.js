import { gql } from 'graphql-request';

export const TODO_FRAGMENT = gql`
  fragment todo on Todo {
    id
    title
    checked
    trip_id
    created_at
    updated_at
  }
`;
