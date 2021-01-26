import { gql } from 'graphql-request';
import { TRIP_FRAGMENT } from '~/apollo/fragments/trip';

export const DESTROY_TRIP_MUTATION = gql`
  mutation DestroyTrip($id: ID!) {
    destroyTrip(id:$id) {
      ...trip
    }
  }
  ${TRIP_FRAGMENT}
`;
