import { gql } from 'graphql-request';
import { CATEGORY_FRAGMENT } from '~/apollo/fragments/category';

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory(
    $name: String
    $unit:String
    $pack_id: ID
  ) {
    createCategory(
      input: {
        name: $name
        unit: $unit
        pack_id: $pack_id
      }
    ) {
      ...category
    }
  }
  ${CATEGORY_FRAGMENT}
`;
