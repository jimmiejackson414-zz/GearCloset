import { gql } from 'graphql-request';

export const NOTIFICATION_FRAGMENT = gql`
  fragment notification on Notification {
    id
    message
    user_id
    viewed
    created_at
    updated_at
  }
`;
