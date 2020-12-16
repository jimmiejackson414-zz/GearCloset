import { remove } from 'lodash';
import createTodoMutation from '~/apollo/mutations/planning/createTodo.gql';
import removeTodoMutation from '~/apollo/mutations/planning/deleteTodo.gql';
import updateTodoMutation from '~/apollo/mutations/planning/updateTodo.gql';
import tripsQuery from '~/apollo/queries/content/trips.gql';

async function create ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: createTodoMutation,
    variables: fields,
    update: (store, { data: { createTodo } }) => {
      // read
      const data = store.readQuery({ query: tripsQuery });
      const trip = data.trips.find(trip => trip.id === fields.trip);

      // mutate
      trip.todos.unshift(createTodo);

      // write
      store.writeQuery({ query: tripsQuery, data });
    }
  });
}

async function destroy ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: removeTodoMutation,
    variables: {
      id: fields.id
    },
    update: (store, { data: { deleteTodo } }) => {
      // read
      const data = store.readQuery({ query: tripsQuery });

      // mutate
      const trip = data.trips.find(trip => trip.id === fields.trip);
      remove(trip.todos, item => item.id === deleteTodo.id);
      const otherTrips = data.trips.filter(t => t !== trip);

      // write
      store.writeQuery({
        query: tripsQuery,
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
    mutation: updateTodoMutation,
    variables: fields
  });
}

export const todoService = {
  create,
  destroy,
  update
};
