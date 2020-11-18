import meQuery from '~/apollo/queries/user/me.gql';

export default {
  apollo: {
    currentUser: {
      query: meQuery
    }
  },

  data: () => ({
    loading: 0
  })
};
