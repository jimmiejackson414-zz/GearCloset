import CREATE_TRIP_MUTATION from '~/apollo/mutations/planning/createTrip.gql';
import TRIPS_QUERY from '~/apollo/queries/content/trips.gql';
import UPDATE_TRIP_MUTATION from '~/apollo/mutations/planning/updateTrip.gql';

async function create ({ graphql, token, variables }) {
  return await graphql.request(
    CREATE_TRIP_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

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
  create,
  fetchTrips,
  update
};
