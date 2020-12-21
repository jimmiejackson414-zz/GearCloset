/* eslint-disable camelcase */
// import { remove } from 'lodash';
'use strict';

import { produce } from 'immer';
import createItemMutation from '~/apollo/mutations/closet/createItem.gql';
import removeItemMutation from '~/apollo/mutations/closet/removeItem.gql';
import updateItemMutation from '~/apollo/mutations/closet/updateItem.gql';
import packsQuery from '~/apollo/queries/content/packs.gql';

async function create ({ fields, pack_id, apollo }) {
  return await apollo.mutate({
    mutation: createItemMutation,
    variables: fields,
    update: (store, { data: { createItem } }) => {
      // read
      const data = store.readQuery({ query: packsQuery });
      const pack = data.packs.find(pack => pack.id === fields.pack_id);
      const category = pack.categories.find(cat => cat.id === fields.category_id);

      // mutate
      category.items.unshift(createItem);

      // write
      store.writeQuery({ query: packsQuery, data });
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
      console.log({ removeItem });

      // read
      const data = store.readQuery({ query: packsQuery });

      // find indices
      const packIndex = data.packs.findIndex(e => e.id === pack_id);
      const categoryIndex = data.packs[packIndex].categories.findIndex(e => e.id === fields.category_id);
      const itemIndex = data.packs[packIndex].categories[categoryIndex].items.findIndex(e => e.id === fields.item_id);

      // mutate
      const newData = produce(data, x => {
        x.packs[packIndex].categories[categoryIndex].items.splice(itemIndex, 1);
      });
      console.log({ newData });

      // write
      store.writeQuery({
        query: packsQuery,
        data: newData
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
