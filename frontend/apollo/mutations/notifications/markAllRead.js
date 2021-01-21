import { gql } from 'graphql-request';
import { NOTIFICATION_FRAGMENT } from '~/apollo/fragments/notification';

export const MARK_ALL_READ_MUTATION = gql`
  mutation MarkAllRead {
    markAllRead {
      status
      notifications {
        ...notification
      }
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;
