import { tripService } from '~/services';
import Trip from '~/database/models/trip';

export const state = () => ({
  isLoading: true,
  selectedTripId: null
});

export const mutations = {
  setSelectedTripId (state, id) {
    state.selectedTripId = id;
  },
  toggleIsLoading (state) {
    state.isLoading = !state.isLoading;
  }
};

export const actions = {
  async fetchTrips ({ commit }) {
    const token = this.$cookies.get('gc_token');
    const payload = { graphql: this.$graphql, token, variables: {} };
    const { trips } = await tripService.fetchTrips(payload);
    Trip.insert({ data: trips });
    commit('setSelectedTripId', trips.length ? trips[0].id : null);
    commit('toggleIsLoading');
  }
};
