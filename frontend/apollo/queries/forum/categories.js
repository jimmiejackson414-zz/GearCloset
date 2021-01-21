import { gql } from 'graphql-request';
import { CATEGORY_FRAGMENT } from '~/apollo/fragments/forum/category';
import { COMMENT_FRAGMENT } from '~/apollo/fragments/forum/comment';
import { POST_FRAGMENT } from '~/apollo/fragments/forum/post';
import { SUBCATEGORY_FRAGMENT } from '~/apollo/fragments/forum/subcategory';

export const FORUM_CATEGORIES_QUERY = gql`
  query Categories {
    forumCategories {
      ...category

      subcategories {
        ...subcategory

        posts {
          ...post
          commentCount

          comments {
            ...comment
          }
        }
      }
    }
  }
  ${CATEGORY_FRAGMENT}
  ${COMMENT_FRAGMENT}
  ${POST_FRAGMENT}
  ${SUBCATEGORY_FRAGMENT}
`;
