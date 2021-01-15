import TripDetail from './models/tripDetail';
import { tripDetailService } from '~/services';

export const state = () => ({
  isLoading: false
});

export const mutations = {
  createTripDetail (state, tripDetail) {
    TripDetail.insert({ data: tripDetail });
  },
  destroyTripDetail (state, tripDetail) {
    TripDetail.delete(tripDetail.id);
  },
  toggleIsLoading (state) {
    state.isLoading = !state.isLoading;
  },
  updateTripDetail (state, tripDetail) {
    TripDetail.update({
      where: tripDetail.id,
      data: { ...tripDetail }
    });
  }
};

export const actions = {
  async createTripDetail ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;
    payload.token = this.$cookies.get('gc_token');

    const { createTripDetail } = await tripDetailService.create(payload);
    commit('createTripDetail', createTripDetail);
    commit('toggleIsLoading');
  },
  async destroyTripDetail ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;
    payload.token = this.$cookies.get('gc_token');

    const { deleteTripDetail } = await tripDetailService.destroy(payload);
    commit('destroyTripDetail', deleteTripDetail);
    commit('toggleIsLoading');
  },
  async updateTripDetail ({ commit }, payload) {
    commit('toggleIsLoading');
    payload.graphql = this.$graphql;
    payload.token = this.$cookies.get('gc_token');

    const { updateTripDetail } = await tripDetailService.update(payload);
    commit('updateTripDetail', updateTripDetail);
    commit('toggleIsLoading');
  }
};
