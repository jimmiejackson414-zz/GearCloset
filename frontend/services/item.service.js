/* eslint-disable camelcase */
import { remove } from 'lodash';
import createItemMutation from '~/apollo/mutations/closet/createItem.gql';
import removeItemMutation from '~/apollo/mutations/closet/removeItem.gql';
import updateItemMutation from '~/apollo/mutations/closet/updateItem.gql';
import packsQuery from '~/apollo/queries/content/packs.gql';
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

// remove completely from db
async function destroy ({ fields, apollo }) {

}

// remove from pack, keep assigned to user
async function removeItem ({ fields, pack_id, apollo }) {
  return await apollo.mutate({
    mutation: removeItemMutation,
    variables: fields,
    optimisticResponse: {
      __typename: 'Mutation',
      removeItem: {
        __typename: 'item',
        id: fields.item_id,
        name: '',
        weight: 0,
        unit: '',
        price: 0,
        generic_type: '',
        category_id: fields.category_id,
        consumable: false,
        worn: false,
        quantity: 0,
        position: 0,
        created_at: Date.now(),
        updated_at: Date.now()
      }
    },
    update: (store, { data: { removeItem } }) => {
      // read
      const data = store.readQuery({ query: packsQuery });

      // mutate
      const pack = data.packs.find(pack => pack.id === pack_id);
      const category = pack.categories.find(category => category.id === fields.category_id);
      remove(category.items, item => item.id === removeItem.id);
      const otherPacks = data.packs.filter(t => t.id !== pack_id);

      // write
      store.writeQuery({
        query: packsQuery,
        data: {
          packs: [pack, ...otherPacks]
        }
      });
    }
  });
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
  removeItem,
  update
};
