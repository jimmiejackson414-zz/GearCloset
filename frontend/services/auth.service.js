import AUTH_IMAGES_QUERY from '~/apollo/queries/content/authImages.gql';
import LOGIN_MUTATION from '~/apollo/mutations/auth/login.gql';
import REGISTER_MUTATION from '~/apollo/mutations/auth/register.gql';

async function fetchImages (graphql) {
  const { authImages } = await graphql.request(AUTH_IMAGES_QUERY);
  return authImages;
};

async function login ({ fields, graphql }) {
  const variables = { ...fields };
  const { login } = await graphql.request(LOGIN_MUTATION, variables);

  return {
    status: login?.access_token ? 1 : 0,
    token: login?.access_token || null
  };
}

async function register ({ variables, graphql }) {
  const { register } = await graphql.request(REGISTER_MUTATION, variables);
  console.log({ register });

  return {
    status: register?.tokens?.access_token ? 1 : 0,
    token: register?.tokens?.access_token || null
  };
}

export const authService = {
  fetchImages,
  login,
  register
};
