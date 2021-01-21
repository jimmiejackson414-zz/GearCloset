/* eslint-disable camelcase */
import { CREATE_ITEM_MUTATION } from '~/apollo/mutations/closet/createItem';
import { DESTROY_ITEM_MUTATION } from '~/apollo/mutations/closet/destroyItem';
import { REMOVE_ITEM_MUTATION } from '~/apollo/mutations/closet/removeItem';
import { UPDATE_ITEM_MUTATION } from '~/apollo/mutations/closet/updateItem';

async function create ({ graphql, variables }) {
  return await graphql.request(CREATE_ITEM_MUTATION, variables);
}

// remove completely from db
async function destroy ({ variables, graphql }) {
  return await graphql.request(DESTROY_ITEM_MUTATION, variables);
}

// remove from pack, keep assigned to user
async function removeItem ({ graphql, variables }) {
  return await graphql.request(REMOVE_ITEM_MUTATION, variables);
}

async function update ({ graphql, variables }) {
  return await graphql.request(UPDATE_ITEM_MUTATION, variables);
}

export const itemService = {
  create,
  destroy,
  removeItem,
  update
};
