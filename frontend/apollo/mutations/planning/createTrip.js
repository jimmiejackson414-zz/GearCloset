import { gql } from 'graphql-request';
import { TRIP_FRAGMENT } from '~/apollo/fragments/trip';

export const CREATE_TRIP_MUTATION = gql`
  mutation CreateTrip(
    $name: String = "New Trip"
    $description: String = "Description"
    $owner_id: ID!
    $pack_id: ID
    $starting_point: String = "Starting Point"
    $ending_point: String = "Ending Point"
  ) {
    createTrip(
      input: {
        name: $name
        description: $description
        owner_id: $owner_id
        pack_id: $pack_id
        starting_point: $starting_point
        ending_point: $ending_point
      }
    ) {
      ...trip
    }
  }
  ${TRIP_FRAGMENT}
`;
