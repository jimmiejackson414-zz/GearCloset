import { gql } from 'graphql-request';

export const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(input: {token: $token}) {
      access_token
      refresh_token
      user {
        id
        first_name
        last_name
        email
      }
    }
  }
`;
