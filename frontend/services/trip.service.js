import TRIPS_QUERY from '~/apollo/queries/content/trips.gql';
import UPDATE_TRIP_MUTATION from '~/apollo/mutations/planning/updateTrip.gql';

async function fetchTrips ({ graphql, token, variables }) {
  return await graphql.request(
    TRIPS_QUERY,
    variables,
    { authorization: `Bearer ${token}` }
  );
};

async function update ({ graphql, token, variables }) {
  return await graphql.request(
    UPDATE_TRIP_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

export const tripService = {
  fetchTrips,
  update
};
