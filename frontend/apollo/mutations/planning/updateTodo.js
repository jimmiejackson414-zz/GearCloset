import { gql } from 'graphql-request';
import { TODO_FRAGMENT } from '~/apollo/fragments/todo';

export const UPDATE_TODO_MUTATION = gql`
  mutation UpdateTodo(
    $id: ID!,
    $checked: Boolean,
    $title: String
  ) {
    updateTodo(
      id: $id,
      input: {
        checked: $checked,
        title: $title
      }
    ) {
      ...todo
    }
  }
  ${TODO_FRAGMENT}
`;
