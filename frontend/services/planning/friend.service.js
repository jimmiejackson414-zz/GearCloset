import addFriendMutation from '~/apollo/mutations/planning/addFriend.gql';
import getFriendsQuery from '~/apollo/queries/user/friends.gql';

async function addFriend ({ data, apollo }) {
  return await apollo.mutate({
    mutation: addFriendMutation,
    variables: data
    // update: (store, { data: { addFriend } }) => {
    // read query

    // modify user's friends

    // write query
    // }
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
