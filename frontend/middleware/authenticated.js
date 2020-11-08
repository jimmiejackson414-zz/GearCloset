export default function ({ app, error, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken();

  if (!hasToken) {
    error({ errorCode: 403, message: 'Must be logged in.' });
    return redirect('/login');
  }
};
