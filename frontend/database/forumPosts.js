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
    console.log({ createPost });

    commit('createPost', createPost);
    commit('toggleIsLoading');
  }
};
