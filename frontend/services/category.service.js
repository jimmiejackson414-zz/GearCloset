import createCategoryMutation from '~/apollo/mutations/closet/createCategory.gql';
import updateCategoryMutation from '~/apollo/mutations/closet/updateCategory.gql';
import packsQuery from '~/apollo/queries/content/packs.gql';

async function create ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: createCategoryMutation,
    variables: fields,
    update: (store, { data: { createCategory } }) => {
      // read
      const data = store.readQuery({ query: packsQuery });
      const pack = data.packs.find(pack => pack.id === fields.pack_id);

      // mutate
      createCategory.items = [];
      pack.categories.push(createCategory);

      // write
      store.writeQuery({ query: packsQuery, data });
    },
    optimisticResponse: {
      __typename: 'Mutation',
      createCategory: {
        __typename: 'category',
        id: -1,
        name: '',
        pack_id: 0,
        items: [],
        created_at: Date.now(),
        updated_at: Date.now()
      }
    }
  });
}

async function destroy ({ fields, apollo }) {

}

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: updateCategoryMutation,
    variables: fields
  });
}

export const categoryService = {
  create,
  destroy,
  update
};
