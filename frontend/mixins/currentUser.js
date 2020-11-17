import meQuery from '~/apollo/queries/user/me.gql';

export default {
  apollo: {
    currentUser: {
      prefetch: false,
      fetchPolicy: 'network-only',
      query: meQuery
    }
  }
};
