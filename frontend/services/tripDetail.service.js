import { CREATE_TRIP_DETAIL_MUTATION } from '~/apollo/mutations/planning/createTripDetail';
import { DELETE_TRIP_DETAIL_MUTATION } from '~/apollo/mutations/planning/deleteTripDetail';
import { UPDATE_TRIP_DETAIL_MUTATION } from '~/apollo/mutations/planning/updateTripDetail';

async function create ({ graphql, token, variables }) {
  return await graphql.request(
    CREATE_TRIP_DETAIL_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

async function destroy ({ graphql, token, variables }) {
  return await graphql.request(
    DELETE_TRIP_DETAIL_MUTATION,
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
