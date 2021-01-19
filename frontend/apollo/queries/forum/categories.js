import { gql } from 'graphql-request';
import { CATEGORY_FRAGMENT } from '~/apollo/fragments/forum/category';
import { SUBCATEGORY_FRAGMENT } from '~/apollo/fragments/forum/subcategory';

export const FORUM_CATEGORIES_QUERY = gql`
  query Categories {
    forumCategories {
      ...category

      subcategories {
        ...subcategories

        posts {
          commentCount
        }
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${SUBCATEGORY_FRAGMENT}
`;
