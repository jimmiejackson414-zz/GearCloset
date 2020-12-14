import meQuery from '~/apollo/queries/user/me.gql';

export default {
  apollo: {
    currentUser: {
      query: meQuery,
      result ({ data: { currentUser } }) {
        this.loading = false;
        return currentUser;
      }
    }
  },

  data: () => ({
    loading: true
  })
};
