import { todoService } from '~/services';
import Todo from '~/database/models/todo';

export const state = () => ({
  isLoading: false
});

export const mutations = {
  createTodo (state, todo) {
    Todo.insert({ data: todo });
  },
  destroyTripDetail (state, todo) {
    Todo.delete(todo.id);
  },
  toggleIsLoading (state) {
    state.isLoading = !state.isLoading;
  },
  updateTodo (state, todo) {
    Todo.update({
      where: todo.id,
      data: { ...todo }
    });
  }
};

export const actions = {
  async createTodo ({ commit }, payload) {
    commit('toggleIsLoading');

    payload.graphql = this.$graphql;
    const { createTodo } = await todoService.create(payload);

    commit('createTodo', createTodo);
    commit('toggleIsLoading');
  },
  async destroyTodo ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;

    const { deleteTodo } = await todoService.destroy(payload);
    commit('destroyTripDetail', deleteTodo);
    commit('toggleIsLoading');
  },
  async updateTodo ({ commit }, payload) {
    commit('toggleIsLoading');

    payload.graphql = this.$graphql;
    const { updateTodo } = await todoService.update(payload);

    commit('updateTodo', updateTodo);
    commit('toggleIsLoading');
  }
};
