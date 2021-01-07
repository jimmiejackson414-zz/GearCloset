/* eslint-disable camelcase */
import { userService } from '~/services';

export const state = () => ({
  backgroundImages: []
});

export const mutations = {};

export const actions = {
  async updateUser ({ commit }, payload) {
    const { updateUser } = await userService.update({ ...payload, graphql: this.$graphql });
    commit('setCurrentUser', updateUser);
  }
};
