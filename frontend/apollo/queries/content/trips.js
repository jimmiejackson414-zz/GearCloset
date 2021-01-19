import { gql } from 'graphql-request';
import { CATEGORY_FRAGMENT } from '~/apollo/fragments/category';
import { ITEM_FRAGMENT } from '~/apollo/fragments/item';
import { PACK_FRAGMENT } from '~/apollo/fragments/pack';
import { SHOPPING_LIST_ITEM_FRAGMENT } from '~/apollo/fragments/shoppingListItem';
import { TRIP_FRAGMENT } from '~/apollo/fragments/trip';
import { TRIP_DETAIL_FRAGMENT } from '~/apollo/fragments/tripDetail';
import { TODO_FRAGMENT } from '~/apollo/fragments/todo';

export const TRIPS_QUERY = gql`
  query Trips {
    trips {
      ...trip

      owner {
        id
        email
        first_name
        last_name
        trail_name
      }

      todos(orderBy: [{ columns: CREATED_AT, order: DESC }]) {
        ...todo
      }

      shoppingListItems(orderBy: [{ columns: CREATED_AT, order: DESC }]) {
        ...shoppingListItem
      }

      tripDetails(orderBy: [{ columns: CREATED_AT, order: DESC }]) {
        ...tripDetail
      }

      users {
        id
        avatar_url
        first_name
        last_name
        trail_name
        email
        pending_invite
      }

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
  ${CATEGORY_FRAGMENT}
  ${ITEM_FRAGMENT}
  ${PACK_FRAGMENT}
  ${SHOPPING_LIST_ITEM_FRAGMENT}
  ${TRIP_DETAIL_FRAGMENT}
  ${TRIP_FRAGMENT}
  ${TODO_FRAGMENT}
`;
