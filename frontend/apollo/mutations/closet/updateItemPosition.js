import { gql } from 'graphql-request';
import { ITEM_FRAGMENT } from '~/apollo/fragments/item';

export const UPDATE_ITEM_POSITION_MUTATION = gql`
  mutation UpdateItemPosition(
    $id:ID!
    $position:Int!
  ) {
    updateItemPosition(
      id:$id
      position:$position
    ) {
      ...item
    }
  }
  ${ITEM_FRAGMENT}
`;
