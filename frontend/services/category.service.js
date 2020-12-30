import { produce } from 'immer';
import CREATE_CATEGORY_MUTATION from '~/apollo/mutations/closet/createCategory.gql';
import DESTROY_CATEGORY_MUTATION from '~/apollo/mutations/closet/destroyCategory.gql';
import UPDATE_CATEGORY_MUTATION from '~/apollo/mutations/closet/updateCategory.gql';
import PACKS_QUERY from '~/apollo/queries/content/packs.gql';

async function create ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: CREATE_CATEGORY_MUTATION,
    variables: fields,
    optimisticResponse: {
      __typename: 'Mutation',
      createCategory: {
        __typename: 'category',
        id: -1,
        name: '',
        pack_id: 0,
        unit: 'oz',
        items: [],
        created_at: Date.now(),
        updated_at: Date.now()
      }
    },
    update: (store, { data: { createCategory } }) => {
      // read
      const data = store.readQuery({ query: PACKS_QUERY });

      // find indices
      const packIndex = data.packs.findIndex(e => e.id === fields.pack_id);

      // mutate
      const newData = produce(data, x => {
        createCategory.items = [];
        x.packs[packIndex].categories.push(createCategory);
      });

      // write
      store.writeQuery({ query: PACKS_QUERY, data: newData });
    }
  });
}

async function destroy ({ category, apollo }) {
  return await apollo.mutate({
    mutation: DESTROY_CATEGORY_MUTATION,
    variables: { id: category.id },
    optimisticResponse: {
      __typename: 'Mutation',
      destroyCategory: {
        __typename: 'category',
        id: category.id,
        name: category.name,
        pack_id: category.pack_id,
        unit: category.unit,
        items: [],
        created_at: Date.now(),
        updated_at: Date.now()
      }
    },
    update: (store, { data: { destroyCategory } }) => {
      // read
      const data = store.readQuery({ query: PACKS_QUERY });

      // find indices
      const packIndex = data.packs.findIndex(e => e.id === destroyCategory.pack_id);
      const categoryIndex = data.packs[packIndex].categories.findIndex(e => e.id === category.id);

      // mutate
      const newData = produce(data, x => {
        x.packs[packIndex].categories.splice(categoryIndex, 1);
      });

      // write
      store.writeQuery({
        query: PACKS_QUERY,
        data: newData
      });
    }
  });
}

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: UPDATE_CATEGORY_MUTATION,
    variables: fields
  });
}

export const categoryService = {
  create,
  destroy,
  update
};
