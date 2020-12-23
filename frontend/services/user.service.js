import UPDATE_AVATAR_MUTATION from '~/apollo/mutations/auth/updateAvatar.gql';
import UPDATE_PASSWORD_MUTATION from '~/apollo/mutations/auth/updatePassword.gql';
import UPDATE_USER_MUTATION from '~/apollo/mutations/auth/update.gql';

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: UPDATE_USER_MUTATION,
    variables: fields
  });
}

async function updateAvatar ({ fields, apollo }) {
  try {
    return await apollo.mutate({
      mutation: UPDATE_AVATAR_MUTATION,
      variables: fields
    });
  } catch (error) {
    return error;
  }
}

async function updatePassword ({ fields, apollo }) {
  try {
    return await apollo.mutate({
      mutation: UPDATE_PASSWORD_MUTATION,
      variables: fields
    });
  } catch (error) {
    return error;
  }
}

export const userService = {
  update,
  updateAvatar,
  updatePassword
};
