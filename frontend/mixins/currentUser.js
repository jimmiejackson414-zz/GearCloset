import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      currentUser: state => state.user
    })
  }
};
