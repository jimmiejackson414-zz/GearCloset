import { CREATE_TODO_MUTATION } from '~/apollo/mutations/planning/createTodo';
import { DELETE_TODO_MUTATION } from '~/apollo/mutations/planning/deleteTodo';
import { UPDATE_TODO_MUTATION } from '~/apollo/mutations/planning/updateTodo';

async function create ({ graphql, token, variables }) {
  return await graphql.request(
    CREATE_TODO_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

async function destroy ({ graphql, token, variables }) {
  return await graphql.request(
    DELETE_TODO_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

async function update ({ graphql, token, variables }) {
  return await graphql.request(
    UPDATE_TODO_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

export const todoService = {
  create,
  destroy,
  update
};
