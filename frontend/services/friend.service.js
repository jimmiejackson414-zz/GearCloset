import { differenceWith } from 'lodash';
import ADD_FRIEND_MUTATION from '~/apollo/mutations/planning/addFriend.gql';
import GET_FRIENDS_QUERY from '~/apollo/queries/user/friends.gql';
import TRIPS_QUERY from '~/apollo/queries/content/trips.gql';

async function addFriend ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: ADD_FRIEND_MUTATION,
    variables: fields,
    update: (store, { data: { addFriends } }) => {
      // read query
      const data = store.readQuery({ query: TRIPS_QUERY });

      // modify user's friends
      const trip = data.trips.find(trip => trip.id === fields.trip);
      const diff = differenceWith(addFriends, trip.users, (a, f) => {
        return a.id === f.id;
      });
      trip.users.push(...diff);
      const otherTrips = data.trips.filter(t => t !== trip);

      // write query
      store.writeQuery({
        query: TRIPS_QUERY,
        data: {
          trips: [trip, ...otherTrips]
        }
      });
    }
  });
}

async function getFriends ({ apollo }) {
  return await apollo.query({
    query: GET_FRIENDS_QUERY
  });
}

export const friendService = {
  addFriend,
  getFriends
};
