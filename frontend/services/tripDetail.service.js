import CREATE_TRIP_DETAIL_MUTATION from '~/apollo/mutations/planning/createTripDetail.gql';
import REMOVE_TRIP_DETAIL_MUTATION from '~/apollo/mutations/planning/deleteTripDetail.gql';
import UPDATE_TRIP_DETAIL_MUTATION from '~/apollo/mutations/planning/updateTripDetail.gql';

async function create ({ graphql, token, variables }) {
  return await graphql.request(
    CREATE_TRIP_DETAIL_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

async function destroy ({ graphql, token, variables }) {
  return await graphql.request(
    REMOVE_TRIP_DETAIL_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

async function update ({ graphql, token, variables }) {
  return await graphql.request(
    UPDATE_TRIP_DETAIL_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

export const tripDetailService = {
  create,
  destroy,
  update
};
