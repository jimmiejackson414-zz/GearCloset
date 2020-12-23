import { remove } from 'lodash';
import CREATE_TRIP_DETAIL_MUTATION from '~/apollo/mutations/planning/createTripDetail.gql';
import REMOVE_TRIP_DETAIL_MUTATION from '~/apollo/mutations/planning/deleteTripDetail.gql';
import UPDATE_TRIP_DETAIL_MUTATION from '~/apollo/mutations/planning/updateTripDetail.gql';
import TRIPS_QUERY from '~/apollo/queries/content/trips.gql';

async function create ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: CREATE_TRIP_DETAIL_MUTATION,
    variables: fields,
    update: (store, { data: { createTripDetail } }) => {
      // read
      const data = store.readQuery({ query: TRIPS_QUERY });
      const trip = data.trips.find(trip => trip.id === fields.trip);

      // mutate
      trip.tripDetails.unshift(createTripDetail);

      // write
      store.writeQuery({ query: TRIPS_QUERY, data });
    }
  });
}

async function destroy ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: REMOVE_TRIP_DETAIL_MUTATION,
    variables: {
      id: fields.id
    },
    update: (store, { data: { deleteTripDetail } }) => {
      // read
      const data = store.readQuery({ query: TRIPS_QUERY });

      // mutate
      const trip = data.trips.find(trip => trip.id === fields.trip);
      remove(trip.tripDetails, detail => detail.id === deleteTripDetail.id);
      const otherTrips = data.trips.filter(t => t !== trip);

      // write
      store.writeQuery({
        query: TRIPS_QUERY,
        data: {
          trips: [trip, ...otherTrips]
        }
      });
    },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteTripDetail: {
        __typename: 'tripDetail',
        id: fields.id,
        title: '',
        url: '',
        value: '',
        type: '',
        trip_id: null,
        created_at: Date.now(),
        updated_at: Date.now()
      }
    }
  });
}

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: UPDATE_TRIP_DETAIL_MUTATION,
    variables: fields
  });
}

export const tripDetailService = {
  create,
  destroy,
  update
};
