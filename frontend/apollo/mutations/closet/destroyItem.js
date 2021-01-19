import { gql } from 'graphql-request';
import { ITEM_FRAGMENT } from '~/apollo/fragments/item';

export const DESTROY_ITEM_MUTATION = gql`
  mutation DestroyItem($id:ID!) {
    destroyItem(id:$id) {
      ...item
    }
  }
  ${ITEM_FRAGMENT}
`;
