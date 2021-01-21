import { MARK_ALL_READ_MUTATION } from '~/apollo/mutations/notifications/markAllRead';
import { MARK_AS_READ_MUTATION } from '~/apollo/mutations/notifications/markAsRead';

async function markAllAsRead ({ variables, graphql }) {
  return await graphql.request(MARK_ALL_READ_MUTATION, variables);
};

async function markAsRead ({ variables, graphql }) {
  return await graphql.request(MARK_AS_READ_MUTATION, variables);
}

export const notificationService = {
  markAllAsRead,
  markAsRead
};
