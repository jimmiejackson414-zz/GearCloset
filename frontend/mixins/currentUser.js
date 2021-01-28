import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      currentUserLoading: state => state.currentUserLoading
    }),
    currentUser () {
      return this.$store.$db().model('users').currentUser();
    }
  }
};
