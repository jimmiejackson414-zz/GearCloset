import packsQuery from '~/apollo/queries/content/packs.gql';
import updatePackMutation from '~/apollo/mutations/planning/updatePack.gql';

async function getPacks ({ apollo }) {
  return await apollo.query({
    query: packsQuery
  });
};

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: updatePackMutation,
    variables: fields
  });
}

export const packService = {
  getPacks,
  update
};
