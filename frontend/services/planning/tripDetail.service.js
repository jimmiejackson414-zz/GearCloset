import { remove } from 'lodash';
import createTripDetailMutation from '~/apollo/mutations/planning/createTripDetail.gql';
import removeTripDetailMutation from '~/apollo/mutations/planning/deleteTripDetail.gql';
import updateTripDetailMutation from '~/apollo/mutations/planning/updateTripDetail.gql';
import tripsQuery from '~/apollo/queries/content/trips.gql';

async function create ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: createTripDetailMutation,
    variables: fields,
    update: (store, { data: { createTripDetail } }) => {
      // read
      const data = store.readQuery({ query: tripsQuery });
      const trip = data.trips.find(trip => trip.id === fields.trip);

      // mutate
      trip.tripDetails.unshift(createTripDetail);

      // write
      store.writeQuery({ query: tripsQuery, data });
    }
  });
}

async function destroy ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: removeTripDetailMutation,
    variables: {
      id: fields.id
    },
    update: (store, { data: { deleteTripDetail } }) => {
      // read
      const data = store.readQuery({ query: tripsQuery });

      // mutate
      const trip = data.trips.find(trip => trip.id === fields.trip);
      remove(trip.tripDetails, detail => detail.id === deleteTripDetail.id);
      const otherTrips = data.trips.filter(t => t !== trip);

      // write
      store.writeQuery({
        query: tripsQuery,
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
    mutation: updateTripDetailMutation,
    variables: fields
  });
}

export const tripDetailService = {
  create,
  destroy,
  update
};
