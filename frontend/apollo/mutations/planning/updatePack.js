import { gql } from 'graphql-request';
import { PACK_FRAGMENT } from '~/apollo/fragments/pack';

export const UPDATE_PACK_MUTATION = gql`
  mutation UpdatePack(
    $id: ID!
    $name: String
    $user_id: ID
    $active: Boolean
    $theme: String
  ) {
    updatePack(
      id: $id
      input: {
        name: $name
        user_id: $user_id
        active: $active
        theme: $theme
      }
    ) {
      ...pack
    }
  }
  ${PACK_FRAGMENT}
`;
