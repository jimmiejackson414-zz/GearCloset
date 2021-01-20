import { CREATE_TRIP_MUTATION } from '~/apollo/mutations/planning/createTrip';
import { TRIPS_QUERY } from '~/apollo/queries/content/trips';
import { UPDATE_TRIP_MUTATION } from '~/apollo/mutations/planning/updateTrip';

async function create ({ graphql, variables }) {
  return await graphql.request(CREATE_TRIP_MUTATION, variables);
}

async function fetchTrips ({ graphql }) {
  return await graphql.request(TRIPS_QUERY, {});
};

async function update ({ graphql, variables }) {
  return await graphql.request(UPDATE_TRIP_MUTATION, variables);
}

export const tripService = {
  create,
  fetchTrips,
  update
};
