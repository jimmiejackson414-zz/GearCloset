import { gql } from 'graphql-request';
import { TODO_FRAGMENT } from '~/apollo/fragments/todo';

export const CREATE_TODO_MUTATION = gql`
  mutation CreateTodo(
    $title: String
    $checked: Boolean = false
    $trip:ID!
  ) {
    createTodo(
      input: {
        title:$title
        checked:$checked
        trip_id: $trip
      }
    ) {
      ...todo
    }
  }
  ${TODO_FRAGMENT}
`;
