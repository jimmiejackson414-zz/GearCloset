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
          v-if="isCurrentPage('/register') || isCurrentPage('/forgot-password')"
          class="nav-link"
          :ripple="false"
          text
          to="/login">
          Login
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main :style="{ backgroundImage: 'url(' + require(`~/assets/images/${randBackground.src}`) + ')' }">
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
      <!-- <div class="social-container">
        <div class="social facebook">
          <a
            href="https://www.facebook.com/jimmiejacksonphotography/"
            target="_blank">
            <icon
              name="facebook-f"
              fill="white"
              height="30px"
              width="30px" />
          </a>
        </div>
        <div class="social instagram">
          <a
            href="https://www.instagram.com/jimmie_photo/"
            target="_blank">
            <icon
              name="instagram-alt"
              fill="white"
              height="30px"
              width="30px" />
          </a>
        </div>
        <div class="social email">
          <a
            href="mailto:howdy@jimmiejacksonphotography.com"
            target="_blank">
            <icon
              name="envelope-alt"
              fill="white"
              height="30px"
              width="30px" />
          </a>
        </div>
      </div> -->
      <span class="subtitle-1">&copy; {{ new Date().getFullYear() }} Gear Closet</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex';
  import { randBackgrounds } from '~/helpers';
  import Logo from '~/components/icons/Logo';

  export default {
    name: 'Homepage',

    data: () => ({
      images: randBackgrounds,
      logo: null
    }),

    computed: {
      ...mapState({
        randBackground: state => state.homepage.background
      }),
      randBackground () {
        return this.images[Math.floor(Math.random() * this.images.length)];
      },
      isUserPage () {
        return this.$route.name === 'login' || this.$route.name === 'register' || this.$route.name === 'forgot-password';
      },
      logoColor () {
        return (this.$route.name !== 'login' || this.$route.name !== 'register' || this.$route.name !== 'forgot-password') ? '#4a4a4a' : '#fff';
      },
      position () {
        return this.randBackground.position;
      }
    },

    methods: {
      isCurrentPage (linkTo) {
        return this.$route.path === linkTo;
      }
    },

    components: {
      Logo
    }
  };
</script>

<style lang="scss">
  @import '~/css/breakpoints.scss';

  .container.container--fluid {
    height: 100%;
    padding: 0;
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
    background-color: transparent;
    color: white;
    display: flex;
    justify-content: center;
    padding: 2rem;

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
  }
</style>
