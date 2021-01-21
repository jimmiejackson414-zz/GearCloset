import { gql } from 'graphql-request';
import { ITEM_FRAGMENT } from '~/apollo/fragments/item';

export const ITEM_QUERY = gql`
  query Item($id:ID!) {
    item(id:$id) {
      id
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
  }
  ${ITEM_FRAGMENT}
`;
