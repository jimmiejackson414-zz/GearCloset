import { forumService } from '~/services';
import ForumPost from '~/database/models/forumPost';

export const state = () => ({
  isLoading: false
});

export const mutations = {
  createPost (state, post) {
    ForumPost.insertOrUpdate({
      data: [{ ...post }]
    });
  },
  fetchPost (state, post) {
    ForumPost.insertOrUpdate({
      data: [{ ...post }]
    });
  },
  toggleIsLoading (state) {
    state.isLoading = !state.isLoading;
  }
};

export const actions = {
  async createPost ({ commit }, payload) {
    commit('toggleIsLoading');

    payload.graphql = this.$graphql;
    payload.token = this.$cookies.get('gc_token');
    const { createPost } = await forumService.createPost(payload);

    commit('createPost', createPost);
    commit('toggleIsLoading');
  },
  async fetchPost ({ commit }, payload) {
    commit('toggleIsLoading');

    payload.graphql = this.$graphql;
    payload.token = this.$cookies.get('gc_token');
    const { post } = await forumService.fetchForumPost(payload);

    commit('fetchPost', post);
    commit('toggleIsLoading');
  }
};
