<template>
  <v-app-bar
    id="home-app-bar"
    app
    elevate-on-scroll
    fixed>
    <v-toolbar-title>
      <nuxt-link to="/dashboard">
        <logo color="#4a4a4a" />
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer />
    <div
      class="right-menu-wrapper d-flex align-items-center mr-4">
      <v-tabs
        class="hidden-sm-and-down"
        optional
        :style="{ width: 'auto' }">
        <v-tab
          v-for="(item, i) in navItems"
          :key="i"
          active-class="text--primary"
          class="font-weight-medium nav-link"
          :exact="item.title === 'Home'"
          min-width="96"
          nuxt
          :ripple="false"
          text
          :to="item.to">
          <span>{{ item.title }}</span>
        </v-tab>
      </v-tabs>
      <v-badge
        bottom
        class="notification-badge"
        color="secondary"
        :content="currentUser.notifications.length || 0"
        dot
        left
        overlap
        :value="currentUser.notifications.length || 0">
        <v-btn
          depressed
          icon>
          <custom-icon
            color="#4a4a4a"
            height="20px"
            name="bell"
            width="20px" />
        </v-btn>
      </v-badge>
      <v-menu
        bottom
        class="avatar-menu"
        close-on-click
        nudge-bottom
        offset-y
        open-on-focus
        open-on-hover
        transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            icon
            v-on="on">
            <avatar
              class="ml-5"
              :initials="currentUser | initials"
              :size="40" />
          </v-btn>
        </template>
        <v-list
          dense
          elevation="1">
          <v-list-item-group>
            <v-list-item
              v-for="(item, i) in dropdownItems"
              :key="i"
              dense>
              <nuxt-link
                class="body-1 font-weight-medium"
                :to="item.to">
                {{ item.title }}
              </nuxt-link>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </div>

    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="drawer = !drawer" />
  </v-app-bar>
</template>

<script>
  import Avatar from '~/components/Avatar';
  import currentUser from '~/mixins/currentUser';
  import CustomIcon from '~/components/icons/CustomIcon';

  export default {
    mixins: [currentUser],

    data: () => ({
      dropdownItems: [
        { title: 'Profile', to: '/profile' },
        { title: 'Logout', to: '/login' }
      ],
      navItems: [
        { title: 'Dashboard', to: '/dashboard', badge: false, hasMenu: false },
        { title: 'Explore', to: '/explore', badge: false, hasMenu: false },
        { title: 'Forum', to: '/forum', badge: false, hasMenu: false },
        { title: 'Planning', to: '/planning', badge: false, hasMenu: false },
        { title: 'Closet', to: '/closet', badge: false, hasMenu: false }
      ]
    }),

    components: {
      Avatar,
      CustomIcon
    }
  };
</script>

<style lang="scss">
  @import '~/css/breakpoints';
  @import '~/css/colors';

  #home-app-bar {
    &.theme--light {
      background-color: #fff;
    }

    &.theme--dark {
      background-color: #272727;
    }

    .logo {
      max-width: 200px;

      @include breakpoint(desktop) {
        max-width: 300px;
      }
    }

    .right-menu-wrapper {
      align-items: center;

      .v-tabs-slider {
        max-width: 50%;
        margin: 0 auto;
      }

      .v-tabs {
        background-color: transparent;

        .v-item-group {
          background-color: transparent;

          .v-tab {
            &:before {
              display: none;
            }
          }
        }

        &.theme--dark {
          .nav-link {
            color: #fff;
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
    animation: bouncein 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

</style>

<style lang="scss">
  @import '~/css/colors';

  #home-app-bar {
    &.theme--light {
      background-color: #fff;
    }

    &.theme--dark {
      background-color: #272727;
    }
  }

  .nav-link {
    &:after {
      height: 2px;
      background: $primary;
      content: "";
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 46px;
    }

    &:before {
      background-color: transparent !important;
    }

    &:hover,
    &:focus {
      outline: none;

      &:after {
        width: calc(100% - 40px);
      }

      &:before {
        background-color: transparent;
      }
    }

    &.v-tab--active {
      &:after {
        background: none;
      }

      &:before {
        background-color: transparent !important;
      }
    }
  }

  .notification-badge {
    .v-badge__badge {
      cursor: pointer;
      right: calc(100% - 20px) !important;
      top: calc(100% - 20px) !important;
    }
  }
</style>
