import User from '~/data/models/user';

export default {
  data: () => ({
    loading: 1
  }),

  computed: {
    currentUser: () => User.query().with(['notifications']).first()
  },

  async mounted () {
    await User.customQuery({ name: 'me' });
    this.loading = false;
  }
};
