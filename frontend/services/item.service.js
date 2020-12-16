import createItemMutation from '~/apollo/mutations/closet/createItem.gql';
import updateItemMutation from '~/apollo/mutations/closet/updateItem.gql';
import tripsQuery from '~/apollo/queries/content/trips.gql';

async function create ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: createItemMutation,
    variables: fields,
    update: (store, { data: { createItem } }) => {
      // read
      const data = store.readQuery({ query: tripsQuery });
      const trip = data.trips.find(trip => trip.id === fields.trip);
      const category = trip.categories.find(cat => cat.id === fields.category);

      // mutate
      category.items.unshift(createItem);

      // write
      store.writeQuery({ query: tripsQuery, data });
    }
  });
}

async function destroy ({ fields, apollo }) {

}

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: updateItemMutation,
    variables: fields
  });
}

export const itemService = {
  create,
  destroy,
  update
};
