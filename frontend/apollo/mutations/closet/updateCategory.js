import { gql } from 'graphql-request';
import { CATEGORY_FRAGMENT } from '~/apollo/fragments/category';

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory(
    $id:ID!
    $unit:String
    $name:String
    $pack_id:ID
  ) {
    updateCategory(
      id:$id
      input: {
        name:$name
        unit:$unit
        pack_id:$pack_id
      }
    ) {
      ...category
    }
  }
  ${CATEGORY_FRAGMENT}
`;
