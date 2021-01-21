import { forumService } from '~/services';
import ForumSubcategory from '~/database/models/forumSubcategory';

export const state = () => ({
  isLoading: false
});

export const mutations = {
  toggleIsLoading (state) {
    state.isLoading = !state.isLoading;
  },
  setForumSubcategory (state, subcategory) {
    ForumSubcategory.insertOrUpdate({
      data: [{ ...subcategory }]
    });
  }
};

export const actions = {
  async fetchForumSlugIndex ({ commit }, slug) {
    commit('toggleIsLoading');

    const payload = {
      graphql: this.$graphql,
      token: this.$cookies.get('gc_token'),
      variables: {
        slug
      }
    };

    const { subcategory } = await forumService.fetchForumSlugIndex(payload);
    commit('setForumSubcategory', subcategory);
    commit('toggleIsLoading');
  }
};
