import LOGIN_MUTATION from '~/apollo/mutations/auth/login.gql';

// not working
async function login (apollo, { email, password }) {
  return await apollo.mutate({
    mutation: LOGIN_MUTATION,
    vairables: {
      email,
      password
    }
  });
}

export const loginService = {
  login
};
