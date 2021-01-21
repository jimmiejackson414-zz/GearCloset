import { CREATE_TODO_MUTATION } from '~/apollo/mutations/planning/createTodo';
import { DELETE_TODO_MUTATION } from '~/apollo/mutations/planning/deleteTodo';
import { UPDATE_TODO_MUTATION } from '~/apollo/mutations/planning/updateTodo';

async function create ({ graphql, variables }) {
  return await graphql.request(
    CREATE_TODO_MUTATION, variables);
}

async function destroy ({ graphql, variables }) {
  return await graphql.request(
    DELETE_TODO_MUTATION, variables);
}

async function update ({ graphql, variables }) {
  return await graphql.request(
    UPDATE_TODO_MUTATION, variables);
}

export const todoService = {
  create,
  destroy,
  update
};
