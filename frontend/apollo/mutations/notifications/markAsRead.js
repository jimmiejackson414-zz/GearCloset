import { gql } from 'graphql-request';
import { NOTIFICATION_FRAGMENT } from '~/apollo/fragments/notification';

export const MARK_AS_READ_MUTATION = gql`
  mutation MarkAsRead($id: ID!, $viewed:Boolean!) {
    markAsRead(id:$id, viewed: $viewed){
      ...notification
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;
