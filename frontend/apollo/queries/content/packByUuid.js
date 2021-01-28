import { gql } from 'graphql-request';
import { PACK_FRAGMENT } from '~/apollo/fragments/pack';
import { CATEGORY_FRAGMENT } from '~/apollo/fragments/category';
import { ITEM_FRAGMENT } from '~/apollo/fragments/item';
import { USER_FRAGMENT } from '~/apollo/fragments/user';

export const PACK_BY_UUID_QUERY = gql`
  query PackByUuid($uuid: String!) {
    packByUuid(uuid:$uuid) {
      ...pack

      categories {
        ...category

        items(orderBy: [{ columns: "position", order: ASC }]) {
          ...item
        }
      }

      user {
        ...user
      }
    }
  }
  ${PACK_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${ITEM_FRAGMENT}
  ${USER_FRAGMENT}
`;
