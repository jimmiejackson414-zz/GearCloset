import { DESTROY_PACK_MUTATION } from '~/apollo/mutations/closet/destroyPack';
import { RESET_PACK_MUTATION } from '~/apollo/mutations/closet/resetPack';
import { PACKS_QUERY } from '~/apollo/queries/content/packs';
import { UPDATE_PACK_MUTATION } from '~/apollo/mutations/planning/updatePack';

async function destroy ({ graphql, variables }) {
  return await graphql.request(DESTROY_PACK_MUTATION, variables);
};

async function getPacks ({ graphql }) {
  return await graphql.request(PACKS_QUERY, {});
};

async function reset ({ graphql, variables }) {
  return await graphql.request(RESET_PACK_MUTATION, variables);
}

async function update ({ graphql, variables }) {
  return await graphql.request(UPDATE_PACK_MUTATION, variables);
}

export const packService = {
  destroy,
  getPacks,
  reset,
  update
};
