import { gql } from 'graphql-request';
import { TRIP_DETAIL_FRAGMENT } from '~/apollo/fragments/tripDetail';

export const DELETE_TRIP_DETAIL_MUTATION = gql`
  mutation DeleteTripDetail($id: ID!) {
    deleteTripDetail(id: $id) {
      ...tripDetail
    }
  }
  ${TRIP_DETAIL_FRAGMENT}
`;
