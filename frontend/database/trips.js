import { tripService } from '~/services';
// import Trip from '~/database/models/trip';

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
    const { trips } = await tripService.fetchTrips(this);
    console.log({ trips });
    // Trip.insert()
    commit('toggleIsLoading');
  }
};
