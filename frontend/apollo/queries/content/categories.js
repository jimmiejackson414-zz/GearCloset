import { gql } from 'graphql-request';
import { CATEGORY_FRAGMENT } from '~/apollo/fragments/category';
import { ITEM_FRAGMENT } from '~/apollo/fragments/item';

export const CATEGORIES_QUERY = gql`
  query Categories($pack_id:ID!) {
    categories(pack_id:$pack_id) {
      ...category

      items(orderBy: [{ columns: "position", order: ASC }]) {
        ...item
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${ITEM_FRAGMENT}
`;
