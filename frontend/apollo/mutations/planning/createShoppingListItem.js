import { gql } from 'graphql-request';
import '~/apollo/fragments/shoppingListItem';

export const CREATE_SHOPPING_LIST_MUTATION = gql`
  mutation CreateShoppingListItem(
    $title: String = "New Item",
    $checked: Boolean = false,
    $quantity: Int = 0,
    $trip: ID!
  ) {
    createShoppingListItem(
      input: {
        title: $title,
        checked: $checked,
        quantity: $quantity,
        trip_id: $trip
      }
    ) {
      ...shoppingListItem
    }
  }
`;
