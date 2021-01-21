import { gql } from 'graphql-request';

export const UPDATE_AVATAR_MUTATION = gql`
  mutation UpdateAvatar($file: String) {
    updateAvatar(file: $file) {
      id
      avatar_url
    }
  }
`;
