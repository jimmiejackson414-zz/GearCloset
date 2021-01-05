export default {
  computed: {
    currentUser () {
      return this.$store.$db().model('users').currentUser();
    }
  }
};
