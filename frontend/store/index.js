import { install } from '@vuex-orm/core';
import database from '~/database';
import ME_QUERY from '~/apollo/queries/user/me.gql';
import User from '~/database/models/user';

export const plugins = [install(database)];

export const state = () => ({
  currentUserLoading: true,
  userId: null
});

export const mutations = {
  logout (state) {
    state.userId = null;
  },
  setCurrentUser (state, user) {
    state.userId = user.id;
    User.insertOrUpdate({
      where: user.id,
      data: {
        ...user
      }
    });
  },
  toggleIsLoading (state) {
    state.currentUserLoading = !state.currentUserLoading;
  }
};

export const actions = {
  async nuxtServerInit ({ commit }, { $cookies, $graphql }) {
    const token = $cookies.get('gc_token');

    if (!token) {
      commit('logout');
      return;
    }

    const requestHeaders = { authorization: `Bearer ${token}` };
    const { currentUser } = await $graphql.request(ME_QUERY, {}, requestHeaders);
    commit('setCurrentUser', currentUser);
    commit('toggleIsLoading');
  }
};
