import { DESTROY_PACK_MUTATION } from '~/apollo/mutations/closet/destroyPack';
import { RESET_PACK_MUTATION } from '~/apollo/mutations/closet/resetPack';
import { PACKS_QUERY } from '~/apollo/queries/content/packs';
import { UPDATE_PACK_MUTATION } from '~/apollo/mutations/planning/updatePack';

async function destroy ({ id, apollo }) {
  return await apollo.mutate({
    mutation: DESTROY_PACK_MUTATION,
    variables: { id },
    optimisticResponse: {
      __typename: 'Mutation',
      destroyItem: {
        __typename: 'pack',
        id,
        name: '',
        user_id: -1,
        active: false,
        theme: '',
        created_at: Date.now(),
        updated_at: Date.now()
      }
    },
    update: (store, { data: { destroyPack } }) => {
      // read
      // const data = store.readQuery({ query: PACKS_QUERY });

      // find indices
      // const packIndex = data.packs.findIndex(e => e.id === destroyPack.id);

      // mutate
      // const newData = produce(data, x => {
      //   x.packs.splice(packIndex, 1);
      // });

      // write
      // store.writeQuery({
      //   query: PACKS_QUERY,
      //   data: newData
      // });
    }
  });
};

async function getPacks ({ graphql, token }) {
  return await graphql.request(
    PACKS_QUERY,
    {},
    { authorization: `Bearer ${token}` }
  );
};

async function reset ({ id, apollo }) {
  return await apollo.mutate({
    mutation: RESET_PACK_MUTATION,
    variables: { id }
  });
}

async function update ({ graphql, token, variables }) {
  return await graphql.request(
    UPDATE_PACK_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

export const packService = {
  destroy,
  getPacks,
  reset,
  update
};
