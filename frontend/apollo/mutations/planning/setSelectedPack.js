import { gql } from 'graphql-request';
import { TRIP_FRAGMENT } from '~/apollo/fragments/trip';
import { PACK_FRAGMENT } from '~/apollo/fragments/pack';
import { CATEGORY_FRAGMENT } from '~/apollo/fragments/category';
import { ITEM_FRAGMENT } from '~/apollo/fragments/item';

export const SET_SELECTED_PACK_MUTATION = gql`
  mutation SetSelectedPack($trip_id: ID!, $pack_id: ID!) {
    setSelectedPack(input: { trip_id: $trip_id pack_id: $pack_id }) {
      ...trip

      pack {
        ...pack

        categories {
          ...category

          items(orderBy: [{ columns: "position", order: ASC }]) {
            ...item
          }
        }
      }
    }
  }
  ${TRIP_FRAGMENT}
  ${PACK_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${ITEM_FRAGMENT}
`;
