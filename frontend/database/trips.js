import { tripService } from '~/services';
import Trip from '~/database/models/trip';

export const state = () => ({
  isLoading: true,
  selectedTripId: null
});

export const mutations = {
  createTrip (state, trip) {
    Trip.insert({ data: trip });
  },
  destroyTrip (state, trip) {
    Trip.delete(trip.id);
  },
  setSelectedTripId (state, id) {
    state.selectedTripId = id;
  },
  toggleIsLoading (state) {
    state.isLoading = !state.isLoading;
  },
  updateTrip (state, trip) {
    Trip.update({
      where: trip.id,
      data: { ...trip }
    });
  }
};

export const actions = {
  async createTrip ({ commit }, payload) {
    commit('toggleIsLoading');

    payload.graphql = this.$graphql;
    const { createTrip } = await tripService.create(payload);

    commit('createTrip', createTrip);
    commit('setSelectedTripId', createTrip.id);
    commit('toggleIsLoading');
  },
  async destroyTrip ({ commit }, payload) {
    commit('toggleIsLoading');

    payload.graphql = this.$graphql;
    const { destroyTrip } = await tripService.destroy(payload);
    commit('destroyTrip', destroyTrip);
    commit('toggleIsLoading');
  },
  async fetchTrips ({ commit }) {
    const payload = { graphql: this.$graphql };
    const { trips } = await tripService.fetchTrips(payload);
    Trip.insert({ data: trips });
    commit('setSelectedTripId', trips.length ? trips[0].id : null);
    commit('toggleIsLoading');
  },
  async updateTrip ({ commit }, payload) {
    payload.graphql = this.$graphql;
    const { updateTrip } = await tripService.update(payload);

    commit('updateTrip', updateTrip);
  }
};
