export const state = () => ({
  sidebarExpandOnHover: true
});

export const actions = {
  toggleSidebarExpandOnHover ({ commit }) {
    commit('toggleSidebarExpandOnHover');
  }
};

export const mutations = {
  toggleSidebarExpandOnHover (state) {
    state.sidebarExpandOnHover = !state.sidebarExpandOnHover;
  }
};
