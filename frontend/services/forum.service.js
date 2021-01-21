import { CREATE_FORUM_POST_MUTATION } from '~/apollo/mutations/forum/createPost';
import { FORUM_CATEGORIES_QUERY } from '~/apollo/queries/forum/categories';
import { FORUM_POST_QUERY } from '~/apollo/queries/forum/post';
import { FORUM_SUBCATEGORY_QUERY } from '~/apollo/queries/forum/subcategory';

async function createPost ({ graphql, variables }) {
  return await graphql.request(CREATE_FORUM_POST_MUTATION, variables);
}

async function fetchForumIndex ({ graphql }) {
  return await graphql.request(FORUM_CATEGORIES_QUERY, {});
}

async function fetchForumSlugIndex ({ graphql, variables }) {
  return await graphql.request(FORUM_SUBCATEGORY_QUERY, variables);
}

async function fetchForumPost ({ graphql, variables }) {
  return await graphql.request(FORUM_POST_QUERY, variables);
}

export const forumService = {
  createPost,
  fetchForumIndex,
  fetchForumPost,
  fetchForumSlugIndex
};
