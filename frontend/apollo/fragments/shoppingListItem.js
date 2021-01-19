import { gql } from 'graphql-request';

export const SHOPPING_LIST_ITEM_FRAGMENT = gql`
  fragment shoppingListItem on ShoppingListItem {
    id
    title
    checked
    quantity
    trip_id
    created_at
    updated_at
  }
`;
