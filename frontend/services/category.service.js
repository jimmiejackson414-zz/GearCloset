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
      pack.categories.push(createCategory);

      // write
      store.writeQuery({ query: packsQuery, data });
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
