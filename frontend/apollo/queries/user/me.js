import { gql } from 'graphql-request';
import { USER_FRAGMENT } from '~/apollo/fragments/user';
import { NOTIFICATION_FRAGMENT } from '~/apollo/fragments/notification';

export const ME_QUERY = gql`
  query Me {
    currentUser: me {
      ...user

      notifications {
        ...notification
      }
    }
  }
  ${USER_FRAGMENT}
  ${NOTIFICATION_FRAGMENT}
`;
