import createTodoMutation from '~/apollo/mutations/planning/createTodo.gql';
import updateTodoMutation from '~/apollo/mutations/planning/updateTodo.gql';
import tripsQuery from '~/apollo/queries/content/trips.gql';

async function createTodo ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: createTodoMutation,
    variables: fields,
    update: (store, { data: { createTodo } }) => {
      // read query
      const data = store.readQuery({ query: tripsQuery });

      // modify todos
      const trip = data.trips.find(trip => trip.id === fields.trip);
      trip.todos.push(createTodo);
      const otherTrips = data.trips.filter(t => t !== trip);

      // write query
      store.writeQuery({
        query: tripsQuery,
        data: {
          trips: [trip, ...otherTrips]
        }
      });
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
