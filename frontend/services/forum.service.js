import FORUM_INDEX_QUERY from '~/apollo/queries/forum/categories.gql';
import FORUM_SUBCATEGORY_QUERY from '~/apollo/queries/forum/subcategory.gql';

async function fetchForumIndex ({ graphql, token }) {
  return await graphql.request(
    FORUM_INDEX_QUERY,
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
  fetchForumIndex,
  fetchForumSlugIndex
};
