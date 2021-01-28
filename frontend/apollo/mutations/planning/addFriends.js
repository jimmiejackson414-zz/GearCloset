import { gql } from 'graphql-request';
import { USER_FRAGMENT } from '~/apollo/fragments/user';

export const ADD_FRIENDS_MUTATION = gql`
  mutation AddFriends($trip: ID! $friends: [AddFriendsInput]!) {
    addFriends(trip_id: $trip input: $friends) {
      ...user
    }
  }
  ${USER_FRAGMENT}
`;
