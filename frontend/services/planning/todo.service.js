import createTodoMutation from '~/apollo/mutations/planning/createTodo.gql';
import updateTodoMutation from '~/apollo/mutations/planning/updateTodo.gql';
import todosQuery from '~/apollo/queries/content/todos.gql';

async function createTodo ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: createTodoMutation,
    variables: fields,
    update: (store, { data: { createTodo } }) => {
      console.log({ createTodo });
      const data = store.readQuery({
        query: todosQuery,
        variables: {
          trip_id: fields.trip
        }
      });
      console.log({ data });
      const trip = data.trips.find(trip => trip.id === fields.trip);
      trip.todos.push(createTodo);
      console.log({ trip });
      store.writeQuery({
        query: todosQuery,
        data
      });
    },
    optimisticResponse: {
      __typename: 'Mutation',
      createTodo: {
        __typename: 'Todo',
        id: -1,
        title: 'New Todo',
        checked: false,
        created_at: Date.now(),
        updated_at: Date.now()
      }
    }
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
