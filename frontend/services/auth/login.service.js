import loginMutation from '~/apollo/mutations/auth/login.gql';

// not working
async function login (apollo, { email, password }) {
  return await apollo.mutate({
    mutation: loginMutation,
    vairables: {
      email,
      password
    }
  });
}

export const loginService = {
  login
};
