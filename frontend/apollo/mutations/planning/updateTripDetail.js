import { gql } from 'graphql-request';
import { TRIP_DETAIL_FRAGMENT } from '~/apollo/fragments/tripDetail';

export const UPDATE_TRIP_DETAIL_MUTATION = gql`
  mutation UpdateTripDetail(
    $id: ID!
    $title: String
    $url: String
    $value: String
    $type: String
  ) {
    updateTripDetail(
      id: $id
      input: {
        title: $title
        url: $url
        value: $value
        type: $type
      }
    ) {
      ...tripDetail
    }
  }
  ${TRIP_DETAIL_FRAGMENT}
`;
