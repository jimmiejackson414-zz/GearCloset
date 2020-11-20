import { remove } from 'lodash';
import createTodoMutation from '~/apollo/mutations/planning/createTodo.gql';
import deleteTodoMutation from '~/apollo/mutations/planning/deleteTodo.gql';
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

async function deleteTodo ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: deleteTodoMutation,
    variables: {
      id: fields.id
    },
    update: (store, { data: { deleteTodo } }) => {
      // read query
      const data = store.readQuery({ query: tripsQuery });

      // filter from todos
      const trip = data.trips.find(trip => trip.id === fields.trip);
      remove(trip.todos, todo => todo.id === deleteTodo.id);
      const otherTrips = data.trips.filter(t => t !== trip);

      // write query
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
        __typename: 'todos',
        id: fields.id,
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
    },
    optimisticResponse: {
      __typename: 'Mutation',
      updateTodo: {
        __typename: 'todos',
        id: data.id,
        checked: false,
        title: '',
        [field]: value,
        created_at: Date.now(),
        updated_at: Date.now()
      }
    }
  });
}

export const todoService = {
  createTodo,
  deleteTodo,
  updateTodo
};
