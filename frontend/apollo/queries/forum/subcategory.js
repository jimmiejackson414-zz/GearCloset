import { gql } from 'graphql-request';
import { SUBCATEGORY_FRAGMENT } from '~/apollo/fragments/forum/subcategory';
import { POST_FRAGMENT } from '~/apollo/fragments/forum/post';
import { USER_FRAGMENT } from '~/apollo/fragments/user';
import { COMMENT_FRAGMENT } from '~/apollo/fragments/forum/comment';

export const FORUM_SUBCATEGORY_QUERY = gql`
  query Subcategory($slug: String!) {
    subcategory: forumSubcategoryBySlug(slug: $slug) {
      ...subcategory

      posts {
        ...post

        author: user {
          ...user
        }

        comments {
          ...comment

          author: user {
            ...user
          }
        }
      }
    }
  }
  ${SUBCATEGORY_FRAGMENT}
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;
