import { gql } from 'graphql-request';
import { SHOPPING_LIST_ITEM_FRAGMENT } from '~/apollo/fragments/shoppingListItem';

export const SHOPPING_LIST_ITEM_QUERY = gql`
  query ShoppingListItems {
    shoppingListItems {
      ...shoppingListItem
    }
  }
  ${SHOPPING_LIST_ITEM_FRAGMENT}
`;
