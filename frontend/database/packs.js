import Pack from './models/pack';
import Trip from './models/trip';
import { packService } from '~/services';

export const state = () => ({
  isLoading: false,
  selectedPackId: null
});

export const mutations = {
  destroyPack (state, pack) {
    Pack.delete(pack.id);
  },
  fetchPacks (state, packs) {
    Pack.insertOrUpdate({
      data: [...packs]
    });
  },
  resetPack (state, pack) {
    Pack.update({
      where: pack.id,
      data: { ...pack }
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
  async destroyPack ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;

    const { destroyPack } = await packService.destroy(payload);
    commit('destroyPack', destroyPack);
    commit('toggleIsLoading');
  },
  async fetchPacks ({ commit }) {
    commit('toggleIsLoading');
    const payload = { graphql: this.$graphql };

    const { packs } = await packService.getPacks(payload);
    commit('fetchPacks', packs);
    commit('toggleIsLoading');
  },
  async resetPack ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;
    const { resetPack } = await packService.reset(payload);
    commit('resetPack', resetPack);
    commit('toggleIsLoading');
  },
  async updatePack ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;

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
