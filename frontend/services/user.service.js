import updateAvatarMutation from '~/apollo/mutations/auth/updateAvatar.gql';
import updatePasswordMutation from '~/apollo/mutations/auth/updatePassword.gql';
import updateUserMutation from '~/apollo/mutations/auth/update.gql';

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: updateUserMutation,
    variables: fields
  });
}

async function updateAvatar ({ fields, apollo }) {
  try {
    return await apollo.mutate({
      mutation: updateAvatarMutation,
      variables: fields
    });
  } catch (error) {
    return error;
  }
}

async function updatePassword ({ fields, apollo }) {
  try {
    return await apollo.mutate({
      mutation: updatePasswordMutation,
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
