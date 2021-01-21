import { ADD_FRIENDS_MUTATION } from '~/apollo/mutations/planning/addFriends';
import { FRIEND_QUERY } from '~/apollo/queries/user/friend';
import { FRIENDS_QUERY } from '~/apollo/queries/user/friends';
import { RESET_PASSWORD_MUTATION } from '~/apollo/mutations/auth/resetPassword';
import { LOGIN_MUTATION } from '~/apollo/mutations/auth/login';
import { LOGOUT_MUTATION } from '~/apollo/mutations/auth/logout';
import { REGISTER_MUTATION } from '~/apollo/mutations/auth/register';
import { UPDATE_AVATAR_MUTATION } from '~/apollo/mutations/auth/updateAvatar';
import { UPDATE_PASSWORD_MUTATION } from '~/apollo/mutations/auth/updatePassword';
import { UPDATE_USER_MUTATION } from '~/apollo/mutations/auth/update';

async function addFriends ({ variables, graphql }) {
  return await graphql.request(ADD_FRIENDS_MUTATION, variables);
}

async function fetchFriend ({ variables, graphql }) {
  return await graphql.request(FRIEND_QUERY, variables);
}

async function fetchFriends ({ variables, graphql }) {
  return await graphql.request(FRIENDS_QUERY, variables);
}

async function forgotPassword ({ variables, graphql }) {
  return await graphql.request(RESET_PASSWORD_MUTATION, variables);
}

async function login ({ variables, graphql }) {
  return await graphql.request(LOGIN_MUTATION, variables);
}

async function logout ({ graphql }) {
  return await graphql.request(LOGOUT_MUTATION, {});
}

async function register ({ variables, graphql }) {
  return await graphql.request(REGISTER_MUTATION, variables);
}

async function update ({ variables, graphql }) {
  return await graphql.request(UPDATE_USER_MUTATION, variables);
}

async function updateAvatar ({ variables, graphql }) {
  return await graphql.request(UPDATE_AVATAR_MUTATION, variables);
}

async function updatePassword ({ variables, graphql }) {
  return await graphql.request(UPDATE_PASSWORD_MUTATION, variables);
}

export const userService = {
  addFriends,
  fetchFriend,
  fetchFriends,
  forgotPassword,
  login,
  logout,
  register,
  update,
  updateAvatar,
  updatePassword
};
