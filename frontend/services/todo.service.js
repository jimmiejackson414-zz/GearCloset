import CREATE_TODO_MUTATION from '~/apollo/mutations/planning/createTodo.gql';
import REMOVE_TODO_MUTATION from '~/apollo/mutations/planning/deleteTodo.gql';
import UPDATE_TODO_MUTATION from '~/apollo/mutations/planning/updateTodo.gql';

async function create ({ graphql, token, variables }) {
  return await graphql.request(
    CREATE_TODO_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

async function destroy ({ graphql, token, variables }) {
  return await graphql.request(
    REMOVE_TODO_MUTATION,
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
