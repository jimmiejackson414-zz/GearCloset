import { gql } from 'graphql-request';

export const ITEM_FRAGMENT = gql`
  fragment item on Item {
    id
    category_id
    name
    weight
    unit
    price
    position
    generic_type
    consumable
    worn
    quantity
    created_at
    updated_at
  }
`;
