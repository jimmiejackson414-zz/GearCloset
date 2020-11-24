import packsQuery from '~/apollo/queries/content/packs.gql';
import setSelectedPackMutation from '~/apollo/mutations/planning/setSelectedPack.gql';
import tripsQuery from '~/apollo/queries/content/trips.gql';

async function getPacks ({ apollo }) {
  return await apollo.query({
    query: packsQuery
  });
};

async function setSelectedPack ({ fields, apollo }) {
  console.log({ fields });
  return await apollo.mutate({
    mutation: setSelectedPackMutation,
    variables: fields,
    update: (store, { data: { setSelectedPack } }) => {
      console.log({ setSelectedPack });
      // read query
      const data = store.readQuery({ query: tripsQuery });
      console.log({ data });

      // modify trip data
      const trip = data.trips.find(trip => trip.id === fields.trip_id);
      trip.pack = setSelectedPack.pack;
      console.log('new trip: ', trip);
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
};

export const packService = {
  getPacks,
  setSelectedPack
};
