export const state = () => ({
  selectedPack: null,
  sidebarExpandOnHover: true
});

export const actions = {
  setSelectedPack ({ commit }, pack) {
    commit('setSelectedPack', pack);
  },
  toggleSidebarExpandOnHover ({ commit }) {
    commit('toggleSidebarExpandOnHover');
  }
};

export const mutations = {
  setSelectedPack (state, pack) {
    state.selectedPack = pack;
  },
  toggleSidebarExpandOnHover (state) {
    state.sidebarExpandOnHover = !state.sidebarExpandOnHover;
  }
};
