<template>
  <v-app-bar
    v-if="!loading"
    id="home-app-bar"
    v-resize="onResize"
    app
    elevate-on-scroll
    fixed>
    <v-toolbar-title>
      <nuxt-link to="/dashboard">
        <logo
          color="#4a4a4a"
          :width="logoWidth" />
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer />
    <div
      v-if="shouldShow"
      class="right-menu-wrapper d-flex align-items-center mr-4">
      <v-tabs
        class="hidden-sm-and-down"
        optional
        :style="{ width: 'auto' }"
        :value="value">
        <v-tab
          v-for="(item, i) in navItems"
          :key="i"
          active-class="text--primary"
          class="font-weight-medium nav-link"
          :exact="item.exact"
          min-width="96"
          nuxt
          :ripple="false"
          text
          :to="item.to">
          <span>{{ item.title }}</span>
        </v-tab>
      </v-tabs>

      <notifications-dropdown :current-user="currentUser" />

      <avatar-dropdown :current-user="currentUser" />
    </div>

    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="handleToggleDrawer" />
  </v-app-bar>
</template>

<script>
  import AvatarDropdown from './AvatarDropdown.vue';
  import NotificationsDropdown from './NotificationsDropdown.vue';
  import currentUser from '~/mixins/currentUser';
  import Logo from '~/components/icons/Logo.vue';

  export default {
    mixins: [currentUser],

    data: () => ({
      logoWidth: '175px',
      navItems: [
        { title: 'Forums', to: '/forums', badge: false, hasMenu: false },
        { title: 'Planning', to: '/planning', badge: false, hasMenu: false },
        { title: 'Closet', to: '/closet', badge: false, hasMenu: false }
      ]
    }),

    computed: {
      shouldShow () {
        return this.$route.name !== 'onboarding';
      },
      maxWidth () {
        return this.$vuetify.breakpoint.mobile ? 296 : 320;
      },
      value () {
        const path = this.$route.path;
        const full = this.$route.fullPath;
        return path[path.length - 1] !== '/' ? `${path}/${full.substring(path.length)}` : full;
      }
    },

    methods: {
      handleToggleDrawer () {
        this.$emit('handle-toggle-drawer');
      },
      onResize () {
        window.innerWidth < 769 ? this.logoWidth = '175px' : this.logoWidth = '300px';
      }
    },

    mounted () {
      this.onResize();
    },

    components: {
      AvatarDropdown,
      Logo,
      NotificationsDropdown
    }
  };
</script>

<style lang="scss">
  #home-app-bar {
    .logo {
      max-width: 200px;

      @include breakpoint(desktop) {
        max-width: 300px;
      }
    }

    .right-menu-wrapper {
      align-items: center;

      .v-tabs {
        .v-tabs-slider {
          max-width: 50%;
          margin: 0 auto;
        }
      }

      .notifications-wrapper {
        .notification-badge {
          .v-badge__badge {
            cursor: pointer;
            right: calc(100% - 20px) !important;
            top: calc(100% - 20px) !important;
          }
        }
      }
    }
  }

  .v-menu__content {
    border-top: 5px solid $primary;

    .v-list {
      padding: 0;

      .v-list-item {
        a {
          color: #4a4a4a;
        }

        &.theme--dark a {
          color: #fff;
        }
      }
    }

  }

  .default-badge {
    .v-badge__badge {
      bottom: calc(100% - 5px) !important;
      left: 100% !important;
    }
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 0.2s ease;
  }

  .fade-leave-active {
    transition: opacity 0.2s ease;
    opacity: 0;
  }

  @mixin ballb($yaxis: 0) {
    transform: translate3d(0, $yaxis, 0);
  }

  @keyframes bouncein {
    0%, 50% { @include ballb(-3px); }
    25%, 75%, 100% { @include ballb() }
  }

  .bounce {
    animation: bouncein 500ms $cubicBezier both;
  }

</style>
