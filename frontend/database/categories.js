import { categoryService } from '~/services';
import Category from '~/database/models/category';

export const state = () => ({
  isLoading: false
});

export const mutations = {
  createCategory (state, category) {
    Category.insert({ data: { ...category } });
  },
  destroyCategory (state, category) {
    Category.delete(category.id);
  },
  toggleIsLoading (state) {
    state.isLoading = !state.isLoading;
  },
  updateCategory (state, category) {
    Category.update({
      where: category.id,
      data: { ...category }
    });
  }
};

export const actions = {
  async createCategory ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;
    const { createCategory } = await categoryService.create(payload);
    commit('createCategory', createCategory);
    commit('toggleIsLoading');
  },
  async destroyCategory ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;
    const { destroyCategory } = await categoryService.destroy(payload);
    commit('destroyCategory', destroyCategory);
    commit('toggleIsLoading');
  },
  async updateCategory ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;
    const { updateCategory } = await categoryService.update(payload);
    commit('updateCategory', updateCategory);
    commit('toggleIsLoading');
  }
};
