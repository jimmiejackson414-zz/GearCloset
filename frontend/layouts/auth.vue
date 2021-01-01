<template>
  <v-app
    light>
    <v-app-bar
      absolute
      app
      flat>
      <v-toolbar-title>
        <nuxt-link to="/">
          <logo :color="logoColor" />
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          v-if="isCurrentPage('/login')"
          class="nav-link"
          :ripple="false"
          text
          to="/register">
          Register
        </v-btn>
        <v-btn
          v-if="isCurrentPage('/register') || isCurrentPage('/forgot-password') || isCurrentPage('/contact')"
          class="nav-link"
          :ripple="false"
          text
          to="/login">
          Login
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main :style="randBackground">
      <v-container
        v-if="isUserPage"
        fluid>
        <nuxt />
      </v-container>
      <v-container v-else>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
      class="custom flex-column"
      tile>
    </v-footer>
  </v-app>
</template>

<script>
  import { authService } from '~/services';
  import Logo from '~/components/icons/Logo.vue';

  export default {
    name: 'Auth',

    async fetch () {
      this.authImages = await authService.fetchImages(this.$graphql);
    },

    data: () => ({
      authImages: [],
      isGenerated: false,
      logo: null,
      randBackground: ''
    }),

    computed: {
      isUserPage () {
        return this.$route.name === 'login' || this.$route.name === 'register' || this.$route.name === 'forgot-password' || this.$route.name === 'contact';
      },
      logoColor () {
        return (this.$route.name !== 'login' || this.$route.name !== 'register' || this.$route.name !== 'forgot-password') ? '#4a4a4a' : '#fff';
      }
    },

    methods: {
      generateBackground () {
        const rand = this.authImages[Math.floor(Math.random() * this.authImages.length)];
        this.randBackground = `backgroundImage: url(${rand ? rand.secure_url : ''})`;
        this.isGenerated = true;
      },
      isCurrentPage (linkTo) {
        return this.$route.path === linkTo;
      }
    },

    watch: {
      authImages (val) {
        if (!this.isGenerated || !this.randBackground) {
          this.generateBackground();
        }
      },
      '$route' (route, oldRoute) {
        if (route !== oldRoute) {
          this.generateBackground();
        }
      }
    },

    components: {
      Logo
    }
  };
</script>

<style lang="scss">
  .container.container--fluid {
    height: 100% !important;
    padding: 0 !important;
  }

  .v-toolbar {
    background-color: white !important;

    &.left {
      .v-toolbar__content {
        justify-content: center;

        @include breakpoint(desktop) {
          justify-content: start;
        }
      }
    }

    &.right {
      .v-toolbar__content {
        justify-content: end;
      }
    }

    &.center {
      .v-toolbar__content {
        justify-content: center;
      }
    }
  }

  .v-main {
    background-size: cover;
    padding-bottom: 0 !important;
  }

  footer.v-footer.custom {
    background-color: transparent !important;
    display: flex;
    justify-content: center;
    padding: 2rem;

    span {
      color: $grey8;
      font-weight: 500;

      @include breakpoint(mobile) {
        color: $grey8;
      }
    }
  }
</style>
