import AUTH_IMAGES_QUERY from '~/apollo/queries/content/authImages.gql';
import LOGIN_MUTATION from '~/apollo/mutations/auth/login.gql';

// not working
async function login (apollo, { email, password }) {
  return await apollo.mutate({
    mutation: LOGIN_MUTATION,
    variables: {
      email,
      password
    }
  });
}

async function fetchImages ($graphql) {
  const { authImages } = await $graphql.request(AUTH_IMAGES_QUERY);
  return authImages;
};

export const authService = {
  fetchImages,
  login
};
