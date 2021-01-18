import { forumService } from '~/services';
import ForumCategory from '~/database/models/forumCategory';

export const state = () => ({
  isLoading: false
});

export const mutations = {
  setForumCategories (state, categories) {
    ForumCategory.insertOrUpdate({
      data: [...categories]
    });
  },
  toggleIsLoading (state) {
    state.isLoading = !state.isLoading;
  }
};

export const actions = {
  async fetchForumIndex ({ commit }) {
    commit('toggleIsLoading');

    const payload = { graphql: this.$graphql, token: this.$cookies.get('gc_token') };
    const { forumCategories } = await forumService.fetchForumIndex(payload);

    commit('setForumCategories', forumCategories);
    commit('toggleIsLoading');
  }
};
