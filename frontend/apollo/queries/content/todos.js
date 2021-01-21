import { gql } from 'graphql-request';
import { TODO_FRAGMENT } from '~/apollo/fragments/todo';

export const TODOS_QUERY = gql`
  query Todos($trip_id: ID!) {
    todos(trip_id: $trip_id) {
      id
      title
      checked
      created_at
      updated_at
    }
  }
  ${TODO_FRAGMENT}
`;
