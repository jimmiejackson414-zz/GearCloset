import { gql } from 'graphql-request';
import { USER_FRAGMENT } from '~/apollo/fragments/user';

export const LOGIN_MUTATION = gql`
  mutation Login(
    $email: String!
    $password: String!
  ) {
    login(
      input: {
        username: $email
        password: $password
      }
    ) {
      access_token
      refresh_token
      expires_in
      token_type
      user {
        ...user
      }
    }
  }
  ${USER_FRAGMENT}
`;
