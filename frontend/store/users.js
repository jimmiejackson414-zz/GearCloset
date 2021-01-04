import { userService } from '~/services';

export const state = () => ({
  currentUser: {},
  friends: []
});

export const actions = {
  async fetchCurrentUser ({ commit }) {
    if (!this.currentUser) {
      const { currentUser } = await userService.currentUser({ graphql: this.$graphql });
      commit('setCurrentUser', currentUser);
    }
  },

  async updateAvatar ({ commit }, payload) {
    const { updateAvatar } = await userService.updateAvatar({ ...payload, graphql: this.$graphql });
    commit('updateAvatar', updateAvatar);
  },

  async updateUser ({ commit }, payload) {
    const { updateUser } = await userService.update({ ...payload, graphql: this.$graphql });
    commit('setCurrentUser', updateUser);
  }
};

export const mutations = {
  setCurrentUser (state, user) {
    state.currentUser = user;
  },
  updateAvatar (state, payload) {
    state.currentUser.avatar_url = payload.avatar_url;
  }
};
