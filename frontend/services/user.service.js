import { ADD_FRIENDS_MUTATION } from '~/apollo/mutations/planning/addFriends';
import { FRIEND_QUERY } from '~/apollo/queries/user/friend';
import { FRIENDS_QUERY } from '~/apollo/queries/user/friends';
import { LOGIN_MUTATION } from '~/apollo/mutations/auth/login';
import { LOGOUT_MUTATION } from '~/apollo/mutations/auth/logout';
import { REGISTER_MUTATION } from '~/apollo/mutations/auth/register';
import { UPDATE_AVATAR_MUTATION } from '~/apollo/mutations/auth/updateAvatar';
import { UPDATE_PASSWORD_MUTATION } from '~/apollo/mutations/auth/updatePassword';
import { UPDATE_USER_MUTATION } from '~/apollo/mutations/auth/update';

async function addFriends ({ variables, graphql, token }) {
  console.log({ variables });
  return await graphql.request(
    ADD_FRIENDS_MUTATION,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

async function fetchFriend ({ variables, graphql, token }) {
  return await graphql.request(
    FRIEND_QUERY,
    variables,
    { Authorization: `Bearer ${token}` }
  );
}

async function fetchFriends ({ variables, graphql, token }) {
  return await graphql.request(
    FRIENDS_QUERY,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

async function login ({ variables, graphql }) {
  return await graphql.request(LOGIN_MUTATION, variables);
}

async function logout ({ graphql, token }) {
  return await graphql.request(
    LOGOUT_MUTATION,
    {},
    { authorization: `Bearer ${token}` }
  );
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
  addFriends,
  fetchFriend,
  fetchFriends,
  login,
  logout,
  register,
  update,
  updateAvatar,
  updatePassword
};
