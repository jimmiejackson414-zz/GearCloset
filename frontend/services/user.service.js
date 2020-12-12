import updateUserMutation from '~/apollo/mutations/auth/update.gql';

async function update ({ fields, apollo }) {
  return await apollo.mutate({
    mutation: updateUserMutation,
    variables: fields
  });
}

export const userService = {
  update
};
