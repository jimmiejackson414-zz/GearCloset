import RESET_PACK_MUTATION from '~/apollo/mutations/closet/resetPack.gql';
import PACKS_QUERY from '~/apollo/queries/content/packs.gql';
import UPDATE_PACK_MUTATION from '~/apollo/mutations/planning/updatePack.gql';

async function getPacks ({ apollo }) {
  return await apollo.query({
    query: PACKS_QUERY
  });
};

async function reset ({ id, apollo }) {
  return await apollo.mutate({
    mutation: RESET_PACK_MUTATION,
    variables: { id }
  });
}

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: UPDATE_PACK_MUTATION,
    variables: fields
  });
}

export const packService = {
  getPacks,
  reset,
  update
};
