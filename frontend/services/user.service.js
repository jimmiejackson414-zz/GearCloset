import requestHeaders from '~/helpers/requestHeaders';
import ME_QUERY from '~/apollo/queries/user/me.gql';
import UPDATE_AVATAR_MUTATION from '~/apollo/mutations/auth/updateAvatar.gql';
import UPDATE_PASSWORD_MUTATION from '~/apollo/mutations/auth/updatePassword.gql';
import UPDATE_USER_MUTATION from '~/apollo/mutations/auth/update.gql';

async function currentUser ({ graphql }) {
  return await graphql.request(
    ME_QUERY,
    {},
    requestHeaders
  );
}

async function update ({ variables, graphql }) {
  return await graphql.request(
    UPDATE_USER_MUTATION,
    variables,
    requestHeaders
  );
}

async function updateAvatar ({ variables, graphql }) {
  return await graphql.request(
    UPDATE_AVATAR_MUTATION,
    variables,
    requestHeaders
  );
}

async function updatePassword ({ variables, graphql }) {
  return await graphql.request(
    UPDATE_PASSWORD_MUTATION,
    variables,
    requestHeaders
  );
}

export const userService = {
  currentUser,
  update,
  updateAvatar,
  updatePassword
};
