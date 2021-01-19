import { gql } from 'graphql-request';

export const DESTROY_PACK_MUTATION = gql`
  mutation DestroyPack($id:ID!) {
    destroyPack(id:$id) {
      id
    }
  }
`;
