import TRIPS_QUERY from '~/apollo/queries/content/trips.gql';
import UPDATE_TRIP_MUTATION from '~/apollo/mutations/planning/updateTrip.gql';

async function fetchTrips ({ graphql, token, variables }) {
  return await graphql.request(
    TRIPS_QUERY,
    variables,
    { authorization: `Bearer ${token}` }
  );
};

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: UPDATE_TRIP_MUTATION,
    variables: fields
  });
}

export const tripService = {
  fetchTrips,
  update
};
