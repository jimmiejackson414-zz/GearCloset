import { gql } from 'graphql-request';
import { POST_FRAGMENT } from '~/apollo/fragments/forum/post';
import { USER_FRAGMENT } from '~/apollo/fragments/user';
import { COMMENT_FRAGMENT } from '~/apollo/fragments/forum/comment';

export const CREATE_FORUM_POST_MUTATION = gql`
  mutation CreatePost(
    $title:String!
    $pinned:Boolean
    $forum_subcategory_id:ID!
    $text:String!
  ) {
    createPost(
      input: {
        title:$title
        pinned:$pinned
        forum_subcategory_id:$forum_subcategory_id
      }
      text:$text
    ) {
      ...post

      subcategory {
        id
      }

      author: user {
        ...user
      }
      commentCount
      comments {
        ...comment

        author: user {
          ...user
        }
      }
    }
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;
