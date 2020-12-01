import User from '~/data/models/user';

export default {
  data: () => ({
    userLoading: 1
  }),

  computed: {
    currentUser: () => User.query().with(['notifications']).first()
  },

  async mounted () {
    if (!User.exists()) {
      await User.customQuery({ name: 'me' });
    }
    this.userLoading = 0;
  }
};
