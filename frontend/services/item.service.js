/* eslint-disable camelcase */
import CREATE_ITEM_MUTATION from '~/apollo/mutations/closet/createItem.gql';
import DESTROY_ITEM_MUTATION from '~/apollo/mutations/closet/destroyItem.gql';
import REMOVE_ITEM_MUTATION from '~/apollo/mutations/closet/removeItem.gql';
import UPDATE_ITEM_MUTATION from '~/apollo/mutations/closet/updateItem.gql';
// import PACKS_QUERY from '~/apollo/queries/content/packs.gql';

async function create ({ category_id, pack_id, apollo }) {
  return await apollo.mutate({
    mutation: CREATE_ITEM_MUTATION,
    variables: {
      name: 'New Item',
      generic_type: 'Type',
      weight: 0,
      unit: 'g',
      price: 0,
      category_id,
      consumable: false,
      worn: false,
      quantity: 0
    },
    optimisticResponse: {
      __typename: 'Mutation',
      createItem: {
        __typename: 'item',
        id: -1,
        name: 'New Item',
        weight: 0,
        unit: 'oz',
        price: 0,
        generic_type: 'Type',
        category_id,
        consumable: false,
        worn: false,
        quantity: 0,
        position: 1,
        created_at: Date.now(),
        updated_at: Date.now()
      }
    },
    update: (store, { data: { createItem } }) => {
      // read
      // const data = store.readQuery({ query: PACKS_QUERY });

      // find indices
      // const packIndex = data.packs.findIndex(e => e.id === pack_id);
      // const categoryIndex = data.packs[packIndex].categories.findIndex(e => e.id === category_id);

      // mutate
      // const newData = produce(data, x => {
      //   const items = x.packs[packIndex].categories[categoryIndex].items;
      //   createItem.position = items.length + 1;
      //   items.push(createItem);
      // });

      // write
      // store.writeQuery({
      //   query: PACKS_QUERY,
      //   data: newData
      // });
    }
  });
}

// remove completely from db
async function destroy ({ item, pack_id, apollo }) {
  return await apollo.mutate({
    mutation: DESTROY_ITEM_MUTATION,
    variables: { id: item.id },
    optimisticResponse: {
      __typename: 'Mutation',
      destroyItem: {
        __typename: 'item',
        id: item.id,
        name: item.name,
        weight: item.weight,
        unit: item.unit,
        price: item.price,
        generic_type: item.generic_type,
        category_id: item.category_id,
        consumable: item.consumable,
        worn: item.worn,
        quantity: item.quantity,
        position: item.position,
        created_at: Date.now(),
        updated_at: Date.now()
      }
    },
    update: (store, { data: { destroyItem } }) => {
      // console.log({ destroyItem });
      // read
      // const data = store.readQuery({ query: PACKS_QUERY });

      // find indices
      // const packIndex = data.packs.findIndex(e => e.id === pack_id);
      // console.log({ packIndex });
      // const categoryIndex = data.packs[packIndex].categories.findIndex(e => e.id === destroyItem.category_id);
      // console.log({ categoryIndex });
      // const itemIndex = data.packs[packIndex].categories[categoryIndex].items.findIndex(e => e.id === destroyItem.id);
      // console.log({ itemIndex });

      // mutate
      // const newData = produce(data, x => {
      //   x.packs[packIndex].categories[categoryIndex].items.splice(itemIndex, 1);
      // });

      // write
      // store.writeQuery({
      //   query: PACKS_QUERY,
      //   data: newData
      // });
      store.modify({
        id: `Item:${destroyItem.id}`,
        fields: {
          items (existingItemRefs, { readField }) {
            return existingItemRefs.filter(
              itemRef => destroyItem.id !== readField('id', itemRef)
            );
          }
        }
      });
    }
  });
}

// remove from pack, keep assigned to user
async function removeItem ({ fields, pack_id, apollo }) {
  return await apollo.mutate({
    mutation: REMOVE_ITEM_MUTATION,
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
      // const data = store.readQuery({ query: PACKS_QUERY });

      // find indices
      // const packIndex = data.packs.findIndex(e => e.id === pack_id);
      // const categoryIndex = data.packs[packIndex].categories.findIndex(e => e.id === fields.category_id);
      // const itemIndex = data.packs[packIndex].categories[categoryIndex].items.findIndex(e => e.id === fields.item_id);

      // mutate
      // const newData = produce(data, x => {
      //   x.packs[packIndex].categories[categoryIndex].items.splice(itemIndex, 1);
      // });

      // write;
      // store.writeQuery({
      //   query: PACKS_QUERY,
      //   data: newData
      // });
    }
  });
}

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: UPDATE_ITEM_MUTATION,
    variables: fields
  });
}

export const itemService = {
  create,
  destroy,
  removeItem,
  update
};
