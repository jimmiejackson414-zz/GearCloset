import { shoppingListItemService } from '~/services';
import ShoppingListItem from '~/database/models/shoppingListItem';

export const state = () => ({
  isLoading: false
});

export const mutations = {
  createShoppingListItem (state, item) {
    ShoppingListItem.insert({ data: item });
  },
  destroyShoppingListItem (state, item) {
    ShoppingListItem.delete(item.id);
  },
  toggleIsLoading (state) {
    state.isLoading = !state.isLoading;
  },
  updateShoppingListItem (state, item) {
    ShoppingListItem.update({
      where: item.id,
      data: { ...item }
    });
  }
};

export const actions = {
  async createShoppingListItem ({ commit }, payload) {
    commit('toggleIsLoading');

    payload.graphql = this.$graphql;
    payload.token = this.$cookies.get('gc_token');
    const { createShoppingListItem } = await shoppingListItemService.create(payload);

    commit('createShoppingListItem', createShoppingListItem);
    commit('toggleIsLoading');
  },
  async destroyShoppingListItem ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;
    payload.token = this.$cookies.get('gc_token');

    const { deleteShoppingListItem } = await shoppingListItemService.destroy(payload);
    commit('destroyShoppingListItem', deleteShoppingListItem);
    commit('toggleIsLoading');
  },
  async updateShoppingListItem ({ commit }, payload) {
    commit('toggleIsLoading');

    payload.graphql = this.$graphql;
    payload.token = this.$cookies.get('gc_token');
    const { updateShoppingListItem } = await shoppingListItemService.update(payload);

    commit('updateShoppingListItem', updateShoppingListItem);
    commit('toggleIsLoading');
  }
};
