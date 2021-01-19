import { CREATE_FORUM_POST_MUTATION } from '~/apollo/mutations/forum/createPost';
import { FORUM_CATEGORIES_QUERY } from '~/apollo/queries/forum/categories';
import { FORUM_SUBCATEGORY_QUERY } from '~/apollo/queries/forum/subcategory';

async function createPost ({ graphql, token, variables }) {
  return await graphql.request(
    CREATE_FORUM_POST_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

async function fetchForumIndex ({ graphql, token }) {
  return await graphql.request(
    FORUM_CATEGORIES_QUERY,
    {},
    { authorization: `Bearer ${token}` }
  );
}

async function fetchForumSlugIndex ({ graphql, token, variables }) {
  return await graphql.request(
    FORUM_SUBCATEGORY_QUERY,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

export const forumService = {
  createPost,
  fetchForumIndex,
  fetchForumSlugIndex
};
