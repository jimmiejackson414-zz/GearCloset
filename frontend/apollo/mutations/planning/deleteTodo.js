import { gql } from 'graphql-request';
import { TODO_FRAGMENT } from '~/apollo/fragments/todo';

export const DELETE_TODO_MUTATION = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id:$id) {
      ...todo
    }
  }
  ${TODO_FRAGMENT}
`;
