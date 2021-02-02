import { gql } from 'graphql-request';

export const ITEM_FRAGMENT = gql`
  fragment item on Item {
    id
    category_id
    name
    weight
    unit
    price
    generic_type
    consumable
    worn
    quantity
    position
    created_at
    updated_at
  }
`;
