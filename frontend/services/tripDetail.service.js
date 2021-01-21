import { CREATE_TRIP_DETAIL_MUTATION } from '~/apollo/mutations/planning/createTripDetail';
import { DELETE_TRIP_DETAIL_MUTATION } from '~/apollo/mutations/planning/deleteTripDetail';
import { UPDATE_TRIP_DETAIL_MUTATION } from '~/apollo/mutations/planning/updateTripDetail';

async function create ({ graphql, variables }) {
  return await graphql.request(CREATE_TRIP_DETAIL_MUTATION, variables);
}

async function destroy ({ graphql, variables }) {
  return await graphql.request(DELETE_TRIP_DETAIL_MUTATION, variables);
}

async function update ({ graphql, variables }) {
  return await graphql.request(UPDATE_TRIP_DETAIL_MUTATION, variables);
}

export const tripDetailService = {
  create,
  destroy,
  update
};
