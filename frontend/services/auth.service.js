import { AUTH_IMAGES_QUERY } from '~/apollo/queries/content/authImages';

async function fetchImages (graphql) {
  return await graphql.request(AUTH_IMAGES_QUERY);
};

export const authService = {
  fetchImages
};
