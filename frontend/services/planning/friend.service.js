import { differenceWith } from 'lodash';
import addFriendMutation from '~/apollo/mutations/planning/addFriend.gql';
import getFriendsQuery from '~/apollo/queries/user/friends.gql';
import tripsQuery from '~/apollo/queries/content/trips.gql';

async function addFriend ({ data, apollo }) {
  return await apollo.mutate({
    mutation: addFriendMutation,
    variables: data,
    update: (store, { data: { addFriends } }) => {
      // read query
      const readQuery = store.readQuery({ query: tripsQuery });

      // modify user's friends
      const trip = readQuery.trips.find(trip => Number(trip.id) === data.tripId);
      const diff = differenceWith(addFriends, trip.friends, (a, f) => {
        return a.id === f.id;
      });
      trip.friends.push(...diff);
      const otherTrips = readQuery.trips.filter(t => t !== trip);

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

async function getFriends ({ apollo }) {
  return await apollo.query({
    query: getFriendsQuery
  });
}

export const friendService = {
  addFriend,
  getFriends
};
