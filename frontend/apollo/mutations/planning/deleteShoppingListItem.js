import { gql } from 'graphql-request';
import { SHOPPING_LIST_ITEM_FRAGMENT } from '~/apollo/fragments/shoppingListItem';

export const DELETE_SHOPPING_LIST_ITEM_MUTATION = gql`
  mutation DeleteShoppingListItem($id: ID!) {
    deleteShoppingListItem(id:$id) {
      ...shoppingListItem
    }
  }
  ${SHOPPING_LIST_ITEM_FRAGMENT}
`;
