import { gql } from 'graphql-request';
import { TRIP_FRAGMENT } from '~/apollo/fragments/trip';

export const UPDATE_TRIP_MUTATION = gql`
  mutation UpdateTrip(
    $id: ID!
    $name: String,
    $description: String,
    $owner_id: ID,
    $pack_id: ID,
    $starting_point: String,
    $ending_point: String
  ) {
    updateTrip(
      id: $id,
      input: {
        name: $name,
        description: $description,
        owner_id: $owner_id,
        pack_id: $pack_id,
        starting_point: $starting_point,
        ending_point: $ending_point
      }
    ) {
      ...trip
    }
  }
  ${TRIP_FRAGMENT}
`;
