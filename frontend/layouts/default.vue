<template>
  <v-app
    id="app"
    v-scroll="onScroll"
    light>
    <navbar />

    <home-drawer v-model="drawer" />

    <v-main>
      <transition
        mode="out-in"
        name="fade">
        <nuxt />
      </transition>
    </v-main>

    <v-footer
      app
      class="custom flex-column"
      padless
      tile>
      <span
        class="subtitle-2 text-dark-grey">&copy; {{ new Date().getFullYear() }} Gear Closet</span>
    </v-footer>

    <v-snackbar
      v-if="alert.message"
      bottom
      :color="alert.type"
      left
      :timeout="3000"
      :value="alert.message">
      <custom-icon
        class="mr-4"
        fill="#fff"
        height="26px"
        :name="alert.type === 'success' ? 'check-circle' : 'multiply'"
        width="26px" />
      {{ alert.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          :ripple="false"
          text
          @click="clearAlert()">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-fab-transition>
      <v-btn
        v-show="showScrollBtn"
        bottom
        color="#4a4a4a"
        dark
        fab
        fixed
        right
        :ripple="false"
        @click="scrollToTop">
        <custom-icon
          fill="white"
          height="40px"
          name="angle-up"
          width="40px" />
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import CustomIcon from '~/components/icons/CustomIcon';
  import Navbar from '~/components/Navbar';

  export default {
    name: 'Default',

    data: () => ({
      drawer: null,

      offsetTop: 0
    }),

    computed: {
      ...mapState({
        alert: state => state.alert
      }),
      showScrollBtn () {
        return this.offsetTop > 60;
      }
    },

    methods: {
      ...mapActions({
        clearAlert: 'alert/clear'
      }),
      onScroll () {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      },
      scrollToTop () {
        this.$vuetify.goTo('#app', { duration: 500, offset: 0 });
      }
    },

    watch: {
      $route () {
        this.clearAlert();
      },
      // reset alert to default
      'alert.snackbar' (newValue, oldValue) {
        if (newValue) {
          setTimeout(() => {
            this.clearAlert();
          }, 3500);
        }
      }
    },

    components: {
      CustomIcon,
      HomeDrawer: () => import('~/components/Drawer'),
      Navbar
    }
  };
</script>

<style lang="scss" scoped>
  @import '~/css/breakpoints';

  footer.v-footer.custom {
    background-color: transparent;
    color: white;
    display: flex;
    justify-content: center;
    padding: 2rem;
    position: relative;

    .social-container {
      display: grid;
      justify-content: center;
      grid-gap: 2rem;
      grid-template-columns: repeat(3, auto);
      margin-bottom: 1rem;

      .social {
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        height: 46px;
        justify-content: center;
        line-height: 1 !important;
        width: 46px;

        &.facebook {
          transition: 0.2s background-color ease-in-out;

          &:hover {
            background-color: #3b5998;
          }
        }

        &.instagram {
          transition: 0.2s background-color ease-in-out;

          &:hover {
            background-color: #fbad50;
          }
        }

        &.email {
          transition: 0.2s background-color ease-in-out;

          &:hover {
            background-color: #21860c;
          }
        }
      }
    }

    &.theme--dark {
      background: var(--v-background-base, #121212) !important;

      .subtitle-2 {
        color: #fff !important;
      }
    }
  }

  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .3s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>

<style lang="scss">
  .v-snack {
    .v-snack__content {
      align-items: center;
      display: flex;
    }
  }
</style>
