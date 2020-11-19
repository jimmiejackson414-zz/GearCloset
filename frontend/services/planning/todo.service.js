import createTodoMutation from '~/apollo/mutations/planning/createTodo.gql';
import updateTodoMutation from '~/apollo/mutations/planning/updateTodo.gql';

async function createTodo ({ data, apollo }) {
  return await apollo.mutate({
    mutation: createTodoMutation,
    variables: data
  });
}

async function updateTodo ({ data, field, value, apollo }) {
  return await apollo.mutate({
    mutation: updateTodoMutation,
    variables: data,
    optimisticResponse: {
      __typename: 'Mutation',
      updateTodo: {
        __typename: 'Todo',
        id: -1,
        [field]: value
      }
    }
  });
}

export const todoService = {
  createTodo,
  updateTodo
};
