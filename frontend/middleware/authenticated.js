export default function ({ app, error, redirect, route }) {
  const hasToken = !!app.$apolloHelpers.getToken();

  // if user doesn't have a token, redirect to login
  if (!hasToken) {
    error({ errorCode: 403, message: 'Must be logged in.' });
    return redirect('/login');
  }

  // if user attempts to access index, reroute
  if (route.name === 'index') {
    if (!hasToken) {
      return redirect('/login');
    }
    return redirect('/closet');
  }
};
