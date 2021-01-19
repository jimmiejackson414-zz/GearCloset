import { gql } from 'graphql-request';

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePassword(
    $password: String!
    $password_confirmation: String!
  ) {
    updatePassword(
      input: {
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      status
      message
    }
  }
`;
