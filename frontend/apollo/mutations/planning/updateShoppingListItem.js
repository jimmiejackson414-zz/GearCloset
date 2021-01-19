import { gql } from 'graphql-request';
import { SHOPPING_LIST_ITEM_FRAGMENT } from '~/apollo/fragments/shoppingListItem';

export const UPDATE_SHOPPING_LIST_MUTATION = gql`
  mutation UpdateShoppingListItem(
    $id: ID!,
    $checked: Boolean,
    $title: String,
    $quantity: Int
  ) {
    updateShoppingListItem(
      id: $id,
      input: {
        checked: $checked,
        title: $title,
        quantity: $quantity
      }
    ) {
      ...shoppingListItem
    }
  }
  ${SHOPPING_LIST_ITEM_FRAGMENT}
`;
