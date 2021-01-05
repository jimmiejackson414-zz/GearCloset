/* eslint-disable camelcase */
import { userService } from '~/services';
import User from '~/database/models/user';

export const state = () => ({
  backgroundImages: [],
  userId: null
});

export const mutations = {
  updateAvatar (state, { id, avatar_url }) {
    User.update({
      where: id,
      data: {
        avatar_url
      }
    });
  },

  setCurrentUser (state, user) {
    state.userId = user.id;
    User.update({
      where: user.id,
      data: {
        ...user
      }
    });
  }
};

export const actions = {
  async updateAvatar ({ commit }, payload) {
    const { updateAvatar } = await userService.updateAvatar({ ...payload, graphql: this.$graphql });
    commit('updateAvatar', updateAvatar);
  },

  async updateUser ({ commit }, payload) {
    const { updateUser } = await userService.update({ ...payload, graphql: this.$graphql });
    commit('setCurrentUser', updateUser);
  }
};
