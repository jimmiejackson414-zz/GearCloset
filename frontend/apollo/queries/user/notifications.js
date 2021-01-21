import { gql } from 'graphql-request';
import { NOTIFICATION_FRAGMENT } from '~/apollo/fragments/notification';

export const NOTIFICATIONS_QUERY = gql`
  query Notifications {
    notifications {
      ...notification
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;
