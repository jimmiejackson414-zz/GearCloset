import { GraphQLClient } from 'graphql-request';
import ME_QUERY from '~/apollo/queries/user/me.gql';
import UPDATE_AVATAR_MUTATION from '~/apollo/mutations/auth/updateAvatar.gql';
import UPDATE_PASSWORD_MUTATION from '~/apollo/mutations/auth/updatePassword.gql';
import UPDATE_USER_MUTATION from '~/apollo/mutations/auth/update.gql';
import User from '~/database/models/user';

const url = process.env.NUXT_ENV_BACKEND_API_URL;
const client = new GraphQLClient(url);

async function currentUser ({ requestHeaders }) {
  return await client.request(ME_QUERY, {}, requestHeaders)
    .then(({ currentUser }) => {
      console.log('currentUser data: ', currentUser);
      User.insertOrUpdate({ data: { ...currentUser } });
    })
    .catch(e => console.log('ERROR: ', e));
}

async function update ({ variables, graphql }) {
  return await graphql.request(
    UPDATE_USER_MUTATION,
    variables
    // requestHeaders
  );
}

async function updateAvatar ({ variables, graphql }) {
  return await graphql.request(
    UPDATE_AVATAR_MUTATION,
    variables
    // requestHeaders
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
  currentUser,
  update,
  updateAvatar,
  updatePassword
};
