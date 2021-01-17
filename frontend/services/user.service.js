import ADD_FRIEND_MUTATION from '~/apollo/mutations/planning/addFriend.gql';
import FRIEND_QUERY from '~/apollo/queries/user/friend.gql';
import GET_FRIENDS_QUERY from '~/apollo/queries/user/friends.gql';
import LOGIN_MUTATION from '~/apollo/mutations/auth/login.gql';
import REGISTER_MUTATION from '~/apollo/mutations/auth/register.gql';
import UPDATE_AVATAR_MUTATION from '~/apollo/mutations/auth/updateAvatar.gql';
import UPDATE_PASSWORD_MUTATION from '~/apollo/mutations/auth/updatePassword.gql';
import UPDATE_USER_MUTATION from '~/apollo/mutations/auth/update.gql';

async function addFriends ({ variables, graphql, token }) {
  console.log({ variables });
  return await graphql.request(
    ADD_FRIEND_MUTATION,
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
    GET_FRIENDS_QUERY,
    variables,
    { authorization: `Bearer ${token}` }
  );
}

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
  addFriends,
  fetchFriend,
  fetchFriends,
  login,
  register,
  update,
  updateAvatar,
  updatePassword
};
