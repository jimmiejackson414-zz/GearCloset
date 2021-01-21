import { gql } from 'graphql-request';

export const REGISTER_MUTATION = gql`
  mutation Register(
    $email: String!,
    $first_name: String!,
    $last_name: String!,
    $password: String!,
    $password_confirmation: String!
  ) {
    register(
      input: {
        email: $email,
        first_name: $first_name,
        last_name: $last_name,
        password: $password,
        password_confirmation: $password_confirmation
      }
    ) {
      tokens {
        access_token
      }
      status
    }
  }
`;
