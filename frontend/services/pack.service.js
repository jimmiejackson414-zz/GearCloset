import { produce } from 'immer';
import DESTROY_PACK_MUTATION from '~/apollo/mutations/closet/destroyPack.gql';
import RESET_PACK_MUTATION from '~/apollo/mutations/closet/resetPack.gql';
import PACKS_QUERY from '~/apollo/queries/content/packs.gql';
import UPDATE_PACK_MUTATION from '~/apollo/mutations/planning/updatePack.gql';

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
      const data = store.readQuery({ query: PACKS_QUERY });

      // find indices
      const packIndex = data.packs.findIndex(e => e.id === destroyPack.id);

      // mutate
      const newData = produce(data, x => {
        x.packs.splice(packIndex, 1);
      });
      console.log({ newData });

      // write
      store.writeQuery({
        query: PACKS_QUERY,
        data: newData
      });
    }
  });
};

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
  destroy,
  getPacks,
  reset,
  update
};
