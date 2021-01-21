import { gql } from 'graphql-request';
import { USER_FRAGMENT } from '~/apollo/fragments/user';

export const FRIENDS_QUERY = gql`
  query Friends {
    friends {
      ...user
    }
  }
  ${USER_FRAGMENT}
`;
