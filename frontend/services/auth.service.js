import requestHeaders from '~/helpers/requestHeaders';
import AUTH_IMAGES_QUERY from '~/apollo/queries/content/authImages.gql';
import LOGIN_MUTATION from '~/apollo/mutations/auth/login.gql';
import REGISTER_MUTATION from '~/apollo/mutations/auth/register.gql';

async function fetchImages (graphql) {
  return await graphql.request(AUTH_IMAGES_QUERY);
};

async function login ({ variables, graphql }) {
  return await graphql.request(
    LOGIN_MUTATION,
    variables,
    requestHeaders
  );
}

async function register ({ variables, graphql }) {
  return await graphql.request(
    REGISTER_MUTATION,
    variables,
    requestHeaders
  );
}

export const authService = {
  fetchImages,
  login,
  register
};
