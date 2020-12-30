import { remove } from 'lodash';
import CREATE_SHOPPING_LIST_MUTATION from '~/apollo/mutations/planning/createShoppingListItem.gql';
import REMOVE_SHOPPING_LIST_MUTATION from '~/apollo/mutations/planning/deleteShoppingListItem.gql';
import UPDATE_SHOPPING_LIST_MUTATION from '~/apollo/mutations/planning/updateShoppingListItem.gql';
import TRIPS_QUERY from '~/apollo/queries/content/trips.gql';

async function create ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: CREATE_SHOPPING_LIST_MUTATION,
    variables: fields,
    update: (store, { data: { createShoppingListItem } }) => {
      // read
      const data = store.readQuery({ query: TRIPS_QUERY });
      const trip = data.trips.find(trip => trip.id === fields.trip);

      // mutate
      trip.shoppingListItems.unshift(createShoppingListItem);

      // write
      store.writeQuery({ query: TRIPS_QUERY, data });
    }
  });
};

async function destroy ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: REMOVE_SHOPPING_LIST_MUTATION,
    variables: {
      id: fields.id
    },
    update: (store, { data: { deleteShoppingListItem } }) => {
      // read
      const data = store.readQuery({ query: TRIPS_QUERY });

      // mutate
      const trip = data.trips.find(trip => trip.id === fields.trip);
      remove(trip.shoppingListItems, item => item.id === deleteShoppingListItem.id);
      const otherTrips = data.trips.filter(t => t !== trip);

      // // write
      store.writeQuery({
        query: TRIPS_QUERY,
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
    mutation: UPDATE_SHOPPING_LIST_MUTATION,
    variables: fields
  });
};

export const shoppingListItemService = {
  create,
  destroy,
  update
};
