import { tripService } from '~/services';
import Trip from '~/database/models/trip';

export const state = () => ({
  isLoading: true
});

export const mutations = {
  toggleIsLoading (state) {
    state.isLoading = !state.isLoading;
  }
};

export const actions = {
  async fetchTrips ({ commit }) {
    const token = this.$cookies.get('gc_token');
    // const payload = { graphql: this.$graphql, token, variables: {} };
    const payload = { token };
    const { trips } = await tripService.fetchTrips(payload);
    console.log('trip module: ', trips);
    Trip.insert({ data: trips });
    commit('toggleIsLoading');
  }
};
