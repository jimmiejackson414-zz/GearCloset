import { CREATE_CATEGORY_MUTATION } from '~/apollo/mutations/closet/createCategory';
import { DESTROY_CATEGORY_MUTATION } from '~/apollo/mutations/closet/destroyCategory';
import { UPDATE_CATEGORY_MUTATION } from '~/apollo/mutations/closet/updateCategory';

async function create ({ graphql, variables }) {
  return await graphql.request(CREATE_CATEGORY_MUTATION, variables);
}

async function destroy ({ graphql, variables }) {
  return await graphql.request(DESTROY_CATEGORY_MUTATION, variables);
}

async function update ({ graphql, variables }) {
  return await graphql.request(UPDATE_CATEGORY_MUTATION, variables);
}

export const categoryService = {
  create,
  destroy,
  update
};
