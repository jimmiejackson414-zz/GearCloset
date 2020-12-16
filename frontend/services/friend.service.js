import { differenceWith } from 'lodash';
import addFriendMutation from '~/apollo/mutations/planning/addFriend.gql';
import getFriendsQuery from '~/apollo/queries/user/friends.gql';
import tripsQuery from '~/apollo/queries/content/trips.gql';

async function addFriend ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: addFriendMutation,
    variables: fields,
    update: (store, { data: { addFriends } }) => {
      // read query
      const data = store.readQuery({ query: tripsQuery });

      // modify user's friends
      const trip = data.trips.find(trip => trip.id === fields.trip);
      const diff = differenceWith(addFriends, trip.users, (a, f) => {
        return a.id === f.id;
      });
      trip.users.push(...diff);
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

async function getFriends ({ apollo }) {
  return await apollo.query({
    query: getFriendsQuery
  });
}

export const friendService = {
  addFriend,
  getFriends
};
