import { gql } from 'graphql-request';
import { CATEGORY_FRAGMENT } from '~/apollo/fragments/category';

export const CATEGORY_QUERY = gql`
  query Category($id:ID!) {
    category(id:$id) {
      ...category
    }
  }
  ${CATEGORY_FRAGMENT}
`;
