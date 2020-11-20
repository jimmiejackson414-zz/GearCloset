import createShoppingListItemMutation from '~/apollo/mutations/planning/createShoppingListItem.gql';
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
  updateShoppingListItem
};
