import { gql } from 'graphql-request';
import { PACK_FRAGMENT } from '~/apollo/fragments/pack';
import { CATEGORY_FRAGMENT } from '~/apollo/fragments/category';
import { ITEM_FRAGMENT } from '~/apollo/fragments/item';

export const RESET_PACK_MUTATION = gql`
  mutation ResetPack($id: ID!) {
    resetPack(id: $id) {
      ...pack

      categories {
        ...category

        items(orderBy: [{ columns: "position", order: ASC }]) {
          ...item
        }
      }
    }
  }
  ${PACK_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${ITEM_FRAGMENT}
`;
