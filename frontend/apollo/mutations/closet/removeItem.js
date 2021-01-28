import { gql } from 'graphql-request';

export const REMOVE_ITEM_MUTATION = gql`
  mutation RemoveItem($item_id:ID!, $category_id:ID!) {
    removeItem(input: { item_id:$item_id category_id:$category_id }) {
      id
      name
      weight
      unit
      price
      generic_type
      consumable
      worn
      quantity
      created_at
      updated_at
    }
  }
`;
