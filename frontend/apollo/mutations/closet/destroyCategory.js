import { gql } from 'graphql-request';
import { CATEGORY_FRAGMENT } from '~/apollo/fragments/category';

export const DESTROY_CATEGORY_MUTATION = gql`
  mutation DestroyCategory($id:ID!) {
    destroyCategory(id:$id) {
      ...category
    }
  }
  ${CATEGORY_FRAGMENT}
`;
