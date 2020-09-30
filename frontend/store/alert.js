export const state = () => ({
  type: null,
  message: null,
  snackbar: false
});

export const actions = {
  success ({ commit }, message) {
    commit('success', message);
  },
  error ({ commit }, message) {
    commit('error', message);
  },
  clear ({ commit }) {
    commit('clear');
  }
};

export const mutations = {
  success (state, message) {
    state.type = 'success';
    state.message = message;
    state.snackbar = true;
  },
  error (state, message) {
    state.type = 'error';
    state.message = message;
    state.snackbar = true;
  },
  clear (state) {
    state.type = null;
    state.message = null;
    state.snackbar = false;
  }
};
