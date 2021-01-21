import { gql } from 'graphql-request';

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      status
      message
    }
  }
`;
