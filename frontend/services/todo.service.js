import { remove } from 'lodash';
import CREATE_TODO_MUTATION from '~/apollo/mutations/planning/createTodo.gql';
import REMOVE_TODO_MUTATION from '~/apollo/mutations/planning/deleteTodo.gql';
import UPDATE_TODO_MUTATION from '~/apollo/mutations/planning/updateTodo.gql';
import TRIPS_QUERY from '~/apollo/queries/content/trips.gql';

async function create ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: CREATE_TODO_MUTATION,
    variables: fields,
    update: (store, { data: { createTodo } }) => {
      // read
      const data = store.readQuery({ query: TRIPS_QUERY });
      const trip = data.trips.find(trip => trip.id === fields.trip);

      // mutate
      trip.todos.unshift(createTodo);

      // write
      store.writeQuery({ query: TRIPS_QUERY, data });
    }
  });
}

async function destroy ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: REMOVE_TODO_MUTATION,
    variables: {
      id: fields.id
    },
    update: (store, { data: { deleteTodo } }) => {
      // read
      const data = store.readQuery({ query: TRIPS_QUERY });

      // mutate
      const trip = data.trips.find(trip => trip.id === fields.trip);
      remove(trip.todos, item => item.id === deleteTodo.id);
      const otherTrips = data.trips.filter(t => t !== trip);

      // write
      store.writeQuery({
        query: TRIPS_QUERY,
        data: {
          trips: [trip, ...otherTrips]
        }
      });
    },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteTodo: {
        __typename: 'todo',
        id: fields.id,
        checked: false,
        created_at: Date.now(),
        updated_at: Date.now()
      }
    }
  });
}

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: UPDATE_TODO_MUTATION,
    variables: fields
  });
}

export const todoService = {
  create,
  destroy,
  update
};
