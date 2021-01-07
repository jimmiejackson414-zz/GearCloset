import LOGIN_MUTATION from '~/apollo/mutations/auth/login.gql';
import REGISTER_MUTATION from '~/apollo/mutations/auth/register.gql';
import UPDATE_AVATAR_MUTATION from '~/apollo/mutations/auth/updateAvatar.gql';
import UPDATE_PASSWORD_MUTATION from '~/apollo/mutations/auth/updatePassword.gql';
import UPDATE_USER_MUTATION from '~/apollo/mutations/auth/update.gql';

async function login ({ variables, graphql }) {
  return await graphql.request(LOGIN_MUTATION, variables);
}

async function register ({ variables, graphql }) {
  return await graphql.request(REGISTER_MUTATION, variables);
}

async function update ({ variables, graphql, token }) {
  return await graphql.request(
    UPDATE_USER_MUTATION,
    variables,
    { Authorization: `Bearer ${token}` }
  );
}

async function updateAvatar ({ variables, graphql, token }) {
  return await graphql.request(
    UPDATE_AVATAR_MUTATION,
    variables,
    { Authorization: `Bearer ${token}` }
  );
}

async function updatePassword ({ variables, graphql }) {
  return await graphql.request(
    UPDATE_PASSWORD_MUTATION,
    variables
    // requestHeaders
  );
}

export const userService = {
  // currentUser,
  login,
  register,
  update,
  updateAvatar,
  updatePassword
};
