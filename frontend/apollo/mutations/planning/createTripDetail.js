import { gql } from 'graphql-request';
import { TRIP_DETAIL_FRAGMENT } from '~/apollo/fragments/tripDetail';

export const CREATE_TRIP_DETAIL_MUTATION = gql`
  mutation CreateTripDetail(
    $url:String
    $title:String
    $value:String
    $type:String
    $trip: ID!
  ) {
    createTripDetail(
      input: {
        title:$title
        url:$url
        value:$value
        type:$type
        trip_id:$trip
      }
    ) {
      ...tripDetail
    }
  }
  ${TRIP_DETAIL_FRAGMENT}
`;
