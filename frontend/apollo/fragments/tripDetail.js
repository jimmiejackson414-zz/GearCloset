import { gql } from 'graphql-request';

export const TRIP_DETAIL_FRAGMENT = gql`
  fragment tripDetail on TripDetail {
    id
    title
    url
    value
    type
    created_at
    updated_at
  }
`;
