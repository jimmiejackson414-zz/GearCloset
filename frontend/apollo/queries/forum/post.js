import { gql } from 'graphql-request';
import { POST_FRAGMENT } from '~/apollo/fragments/forum/post';
import { USER_FRAGMENT } from '~/apollo/fragments/user';
import { COMMENT_FRAGMENT } from '~/apollo/fragments/forum/comment';
import { SUBCATEGORY_FRAGMENT } from '~/apollo/fragments/forum/subcategory';

export const POST_QUERY = gql`
  query Post($slug: String!) {
    post: forumPostBySlug(slug: $slug) {
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

      subcategory {
        ...subcategory
      }
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
  ${COMMENT_FRAGMENT}
  ${SUBCATEGORY_FRAGMENT}
`;
