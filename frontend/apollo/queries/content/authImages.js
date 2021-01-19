import { gql } from 'graphql-request';

export const AUTH_IMAGES_QUERY = gql`
  query AuthImages {
    authImages {
      asset_id
      public_id
      height
      width
      secure_url
    }
  }
`;
