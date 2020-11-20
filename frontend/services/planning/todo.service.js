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
    update: (store, { data: { updateTodo } }) => {
      // read query
      const readQuery = store.readQuery({ query: tripsQuery });

      // modify todo
      const trip = readQuery.trips.find(trip => trip.id === data.trip);
      const todo = trip.todos.find(todo => todo.id === data.id);
      todo[field] = value;

      const otherTrips = readQuery.trips.filter(t => t !== trip);

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

export const todoService = {
  createTodo,
  updateTodo
};
