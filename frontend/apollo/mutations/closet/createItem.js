import { gql } from 'graphql-request';
import { ITEM_FRAGMENT } from '~/apollo/fragments/item';

export const CREATE_ITEM_MUTATION = gql`
  mutation CreateItem(
    $name:String
    $weight:Float
    $unit:String
    $price:Int
    $generic_type:String
    $category_id:ID!
    $consumable:Boolean
    $worn:Boolean
    $quantity:Int
  ) {
    createItem(
      input: {
        name: $name
        weight: $weight
        unit: $unit
        price: $price
        generic_type: $generic_type
        category_id: $category_id
        consumable: $consumable
        worn: $worn
        quantity: $quantity
      }) {
      ...item
    }
  }
  ${ITEM_FRAGMENT}
`;
