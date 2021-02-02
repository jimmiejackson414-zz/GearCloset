import { itemService } from '~/services';
import Item from '~/database/models/item';

export const state = () => ({
  isLoading: false
});

export const mutations = {
  createItem (state, item) {
    Item.insert({ data: { ...item } });
  },
  destroyItem (state, item) {
    Item.delete(item.id);
  },
  removeItem (state, item) {
    console.log('WRITE REMOVE ITEM MUTATION');
  },
  toggleIsLoading (state) {
    state.isLoading = !state.isLoading;
  },
  updateItem (state, item) {
    Item.update({
      where: item.id,
      data: { ...item }
    });
  }
};

export const actions = {
  async createItem ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;
    const { createItem } = await itemService.create(payload);
    commit('createItem', createItem);
    commit('toggleIsLoading');
  },
  async destroyItem ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;
    const { destroyItem } = await itemService.destroy(payload);
    commit('destroyItem', destroyItem);
    commit('toggleIsLoading');
  },
  async removeItem ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;
    const { removeItem } = await itemService.removeItem(payload);
    commit('removeItem', removeItem);
    commit('toggleIsLoading');
  },
  async updateItem ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;
    const { updateItem } = await itemService.update(payload);
    commit('updateItem', updateItem);
    commit('toggleIsLoading');
  },
  async updateItemPosition ({ commit }, payload) {
    payload.graphql = this.$graphql;
    const { updateItemPosition } = await itemService.updatePosition(payload);
    console.log({ updateItemPosition });
  }
};
