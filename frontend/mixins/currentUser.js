import { mapActions, mapState } from 'vuex';

export default {
  async fetch () {
    await this.fetchCurrentUser();
    this.loading = false;
  },

  data: () => ({
    loading: true
  }),

  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser
    })
  },

  methods: {
    ...mapActions({
      fetchCurrentUser: 'users/fetchCurrentUser'
    })
  }
};
