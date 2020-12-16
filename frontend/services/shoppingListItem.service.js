import { remove } from 'lodash';
import createShoppingListItemMutation from '~/apollo/mutations/planning/createShoppingListItem.gql';
import removeShoppingListItemMutation from '~/apollo/mutations/planning/deleteShoppingListItem.gql';
import updateShoppingListMutation from '~/apollo/mutations/planning/updateShoppingListItem.gql';
import tripsQuery from '~/apollo/queries/content/trips.gql';

async function create ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: createShoppingListItemMutation,
    variables: fields,
    update: (store, { data: { createShoppingListItem } }) => {
      // read
      const data = store.readQuery({ query: tripsQuery });
      const trip = data.trips.find(trip => trip.id === fields.trip);

      // mutate
      trip.shoppingListItems.unshift(createShoppingListItem);

      // write
      store.writeQuery({ query: tripsQuery, data });
    }
  });
};

async function destroy ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: removeShoppingListItemMutation,
    variables: {
      id: fields.id
    },
    update: (store, { data: { deleteShoppingListItem } }) => {
      // read
      const data = store.readQuery({ query: tripsQuery });

      // mutate
      const trip = data.trips.find(trip => trip.id === fields.trip);
      remove(trip.shoppingListItems, item => item.id === deleteShoppingListItem.id);
      const otherTrips = data.trips.filter(t => t !== trip);

      // // write
      store.writeQuery({
        query: tripsQuery,
        data: {
          trips: [trip, ...otherTrips]
        }
      });
    },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteShoppingListItem: {
        __typename: 'shoppingListItem',
        id: fields.id,
        checked: false,
        quantity: 0,
        created_at: Date.now(),
        updated_at: Date.now()
      }
    }
  });
};

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: updateShoppingListMutation,
    variables: fields
  });
};

export const shoppingListItemService = {
  create,
  destroy,
  update
};
