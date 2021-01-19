import { gql } from 'graphql-request';

export const TRIP_FRAGMENT = gql`
  fragment trip on Trip {
    id
    name
    description
    starting_point
    ending_point
    owner_id
  }
`;
