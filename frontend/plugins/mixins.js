import Vue from 'vue';
import { mapState } from 'vuex';

Vue.mixin({
  ...mapState({
    currentUser: state => state.user
  })
});
