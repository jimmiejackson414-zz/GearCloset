import { gql } from 'graphql-request';

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($email: String!) {
    forgotPassword(input: {email: $email}) {
      status
      message
    }
  }
`;
