import { remove } from 'lodash';
import createShoppingListItemMutation from '~/apollo/mutations/planning/createShoppingListItem.gql';
import deleteShoppingListItemMutation from '~/apollo/mutations/planning/deleteShoppingListItem.gql';
import updateShoppingListItemMutation from '~/apollo/mutations/planning/updateShoppingListItem.gql';
import tripsQuery from '~/apollo/queries/content/trips.gql';

async function createShoppingListItem ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: createShoppingListItemMutation,
    variables: fields,
    update: (store, { data: { createShoppingListItem } }) => {
      // read query
      const data = store.readQuery({ query: tripsQuery });

      // modify item
      const trip = data.trips.find(trip => trip.id === fields.trip);
      trip.shopping_list_items.push(createShoppingListItem);
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

async function deleteShoppingListItem ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: deleteShoppingListItemMutation,
    variables: {
      id: fields.id
    },
    update: (store, { data: { deleteShoppingListItem } }) => {
      // read query
      const data = store.readQuery({ query: tripsQuery });

      // filter from shopping list items
      const trip = data.trips.find(trip => trip.id === fields.trip);
      remove(trip.shopping_list_items, item => item.id === deleteShoppingListItem.id);
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
      deleteShoppingListItem: {
        __typename: 'shopping_list_items',
        id: fields.id,
        checked: false,
        quantity: 0,
        created_at: Date.now(),
        updated_at: Date.now()
      }
    }
  });
}

async function updateShoppingListItem ({ data, field, value, apollo }) {
  return await apollo.mutate({
    mutation: updateShoppingListItemMutation,
    variables: data,
    update: (store, { data: { updateShoppingListItem } }) => {
      // read query
      const readQuery = store.readQuery({ query: tripsQuery });

      // modify shopping list item
      const trip = readQuery.trips.find(trip => trip.id === data.trip);
      const item = trip.shopping_list_items.find(i => i.id === data.id);
      item[field] = value;

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
      updateShoppingListItem: {
        __typename: 'shopping_list_items',
        id: data.id,
        checked: false,
        title: '',
        quantity: 0,
        [field]: value,
        created_at: Date.now(),
        updated_at: Date.now()
      }
    }
  });
}

export const shoppingListItemService = {
  createShoppingListItem,
  deleteShoppingListItem,
  updateShoppingListItem
};
