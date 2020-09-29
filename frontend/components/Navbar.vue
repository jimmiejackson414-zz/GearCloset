<template>
  <v-app-bar
    id="home-app-bar"
    app
    elevate-on-scroll
    fixed>
    <v-toolbar-title>
      <nuxt-link to="/">
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
          v-for="(item, i) in items"
          :key="i"
          active-class="text--primary"
          class="font-weight-bold nav-link"
          :exact="item.title === 'Home'"
          min-width="96"
          nuxt
          :ripple="false"
          text
          :to="item.to">
          <v-menu
            v-if="item.hasMenu"
            bottom
            close-on-click
            nudge-bottom
            offset-y
            open-on-hover
            transition="slide-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on">
                {{ item.title }}
              </span>
            </template>
            <v-list
              elevation="1">
              <v-list-item
                v-for="(menuItem, index) in item.menuItems"
                :key="index">
                <nuxt-link
                  class="body-1 font-weight-medium"
                  :to="menuItem.to">
                  {{ menuItem.title }}
                </nuxt-link>
              </v-list-item>
            </v-list>
          </v-menu>
          <span v-else>{{ item.title }}</span>
        </v-tab>
      </v-tabs>
      <v-btn
        icon>
        <custom-icon
          color="#4a4a4a"
          height="20px"
          name="bell"
          width="20px" />
      </v-btn>
      <avatar
        class="ml-5"
        :size="40" />
    </div>

    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="drawer = !drawer" />
  </v-app-bar>
</template>

<script>
  import Avatar from '~/components/Avatar';
  import CustomIcon from '~/components/icons/CustomIcon';

  export default {
    data: () => ({
      items: [
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
  @import '~/css/breakpoints.scss';

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

            .nav-link {
              color: rgba(0, 0, 0, 0.54);
              font-size: 1rem;
              letter-spacing: 2px;
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
    .v-list-item {
      a {
        color: #4a4a4a;
      }

      &.theme--dark a {
        color: #fff;
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
