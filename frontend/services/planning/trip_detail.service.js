import { remove } from 'lodash';
import createTripDetailMutation from '~/apollo/mutations/planning/createTripDetail.gql';
import deleteTripDetailMutation from '~/apollo/mutations/planning/deleteTripDetail.gql';
import updateTripDetailMutation from '~/apollo/mutations/planning/updateTripDetail.gql';
import tripsQuery from '~/apollo/queries/content/trips.gql';

async function createTripDetail ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: createTripDetailMutation,
    variables: fields,
    update: (store, { data: { createTripDetail } }) => {
      // read query
      const data = store.readQuery({ query: tripsQuery });

      // modify trip details
      const trip = data.trips.find(trip => trip.id === fields.trip);
      trip.trip_details.push(createTripDetail);
      const otherTrips = data.trips.filter(t => t !== trip);

      // write query
      store.writeQuery({
        query: tripsQuery,
        data: {
          trips: [trip, ...otherTrips]
        }
      });
    }
  });
}

async function deleteTripDetail ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: deleteTripDetailMutation,
    variables: {
      id: fields.id
    },
    update: (store, { data: { deleteTripDetail } }) => {
      // read query
      const data = store.readQuery({ query: tripsQuery });

      // filter from trip details
      const trip = data.trips.find(trip => trip.id === fields.trip);
      remove(trip.trip_details, detail => detail.id === deleteTripDetail.id);
      const otherTrips = data.trips.filter(t => t !== trip);

      // write query
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
        __typename: 'trip_details',
        id: fields.id,
        title: '',
        url: '',
        value: '',
        type: '',
        created_at: Date.now(),
        updated_at: Date.now()
      }
    }
  });
}

async function updateTripDetail ({ data, field, value, apollo }) {
  return await apollo.mutate({
    mutation: updateTripDetailMutation,
    variables: data,
    update: (store, { data: { updateTripDetail } }) => {
      // read query
      const readQuery = store.readQuery({ query: tripsQuery });

      // modify trip detail
      const trip = readQuery.trips.find(trip => trip.id === data.trip);
      const detail = trip.trip_details.find(d => d.id === data.id);
      detail[field] = value;

      const otherTrips = readQuery.trips.filter(t => t !== trip);

      // write query
      store.writeQuery({
        query: tripsQuery,
        data: {
          trips: [trip, ...otherTrips]
        }
      });
    },
    optimisticResponse: {
      __typename: 'Mutation',
      updateTripDetail: {
        __typename: 'trip_details',
        id: data.id,
        title: '',
        url: '',
        value: '',
        type: '',
        [field]: value,
        created_at: Date.now(),
        updated_at: Date.now()
      }
    }
  });
}

export const tripDetailService = {
  createTripDetail,
  deleteTripDetail,
  updateTripDetail
};
