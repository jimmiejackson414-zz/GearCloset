import Notification from './models/notification';
import { notificationService } from '~/services';

export const state = () => ({});

export const mutations = {
  markAllAsRead (state) {
    Notification.update({
      where: notification => {
        return notification.user_id === this.$store.state.userId;
      },
      data: { viewed: true }
    });
  },
  markAsRead (state, notification) {
    Notification.update({
      where: notification.id,
      data: { ...notification }
    });
  }
};

export const actions = {
  async markAllAsRead ({ commit }) {
    const payload = { graphql: this.$graphql };
    await notificationService.markAllAsRead(payload);
    commit('markAllAsRead');
  },
  async markAsRead ({ commit }, payload) {
    payload.graphql = this.$graphql;
    const { markAsRead } = await notificationService.markAsRead(payload);
    commit('markAsRead', markAsRead);
  }
};
