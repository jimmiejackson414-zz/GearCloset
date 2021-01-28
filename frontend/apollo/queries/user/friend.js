import { gql } from 'graphql-request';
import { USER_FRAGMENT } from '~/apollo/fragments/user';
import { PACK_FRAGMENT } from '~/apollo/fragments/pack';
import { TRIP_FRAGMENT } from '~/apollo/fragments/trip';

export const FRIEND_QUERY = gql`
  query Friend($id: ID!) {
    friend: user(id: $id) {
      ...user

      packs {
        ...pack
      }

      trips {
        ...trip
      }
    }
  }
  ${USER_FRAGMENT}
  ${PACK_FRAGMENT}
  ${TRIP_FRAGMENT}
`;
