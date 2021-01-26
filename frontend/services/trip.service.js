import { CREATE_TRIP_MUTATION } from '~/apollo/mutations/planning/createTrip';
import { DESTROY_TRIP_MUTATION } from '~/apollo/mutations/planning/deleteTrip';
import { TRIPS_QUERY } from '~/apollo/queries/content/trips';
import { UPDATE_TRIP_MUTATION } from '~/apollo/mutations/planning/updateTrip';

async function create ({ graphql, variables }) {
  return await graphql.request(CREATE_TRIP_MUTATION, variables);
}

async function destroy ({ graphql, variables }) {
  return await graphql.request(DESTROY_TRIP_MUTATION, variables);
}

async function fetchTrips ({ graphql }) {
  return await graphql.request(TRIPS_QUERY, {});
};

async function update ({ graphql, variables }) {
  return await graphql.request(UPDATE_TRIP_MUTATION, variables);
}

export const tripService = {
  create,
  destroy,
  fetchTrips,
  update
};
