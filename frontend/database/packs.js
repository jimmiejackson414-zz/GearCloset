import Pack from './models/pack';
import Trip from './models/trip';
import { packService } from '~/services';

export const state = () => ({
  isLoading: false,
  selectedPackId: null
});

export const mutations = {
  fetchPacks (state, packs) {
    Pack.insertOrUpdate({
      data: [...packs]
    });
  },
  setSelectedPackId (state, id) {
    state.selectedPackId = id;
  },
  toggleIsLoading (state) {
    state.isLoading = !state.isLoading;
  }
};

export const actions = {
  async fetchPacks ({ commit }) {
    commit('toggleIsLoading');
    const token = this.$cookies.get('gc_token');
    const payload = { graphql: this.$graphql, token };

    const { packs } = await packService.getPacks(payload);
    commit('fetchPacks', packs);
    commit('toggleIsLoading');
  },
  async update ({ commit }, payload) {
    commit('toggleIsLoading');
    const token = this.$cookies.get('gc_token');
    payload.graphql = this.$graphql;
    payload.token = token;

    const { updatePack } = await packService.update(payload);
    Pack.insertOrUpdate({
      data: [{ ...updatePack }]
    });

    if (payload?.updateTrip) {
      Trip.update({
        where: payload.variables.id,
        data: {
          pack_id: payload.variables.pack_id
        }
      });
    }
    commit('toggleIsLoading');
  }
};
