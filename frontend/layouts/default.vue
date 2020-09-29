<template>
  <v-app
    id="app"
    v-scroll="onScroll"
    light>
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
        <transition name="slide-fade">
          <v-text-field
            v-show="searchIsOpen"
            ref="searchField"
            v-model="searchTerm"
            color="primary"
            dense
            full-width
            hide-details
            outlined
            type="search"
            @keypress.enter="performSearch">
            <template v-slot:append>
              <v-btn
                icon
                :ripple="false"
                small
                @click="performSearch">
                <icon
                  fill="gray"
                  height="20px"
                  name="search"
                  width="20px" />
              </v-btn>
            </template>
          </v-text-field>
        </transition>
        <transition
          mode="out-in"
          name="fade">
          <v-btn
            v-if="!searchIsOpen"
            key="open"
            class="hidden-sm-and-down mr-4"
            icon
            :ripple="false"
            @click.prevent="toggleSearchInput">
            <icon
              fill="gray"
              height="20px"
              name="search"
              width="20px" />
          </v-btn>
          <v-btn
            v-else
            key="close"
            class="hidden-sm-and-down mr-4"
            icon
            :ripple="false"
            @click.prevent="toggleSearchInput">
            <icon
              fill="rgb(183, 65, 14)"
              height="20px"
              name="multiply"
              width="20px" />
          </v-btn>
        </transition>
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
        <span class="ml-4">
          <v-tooltip bottom>
            <template #activator="{ on }">
              <span v-on="on">
                <v-switch
                  v-model="$vuetify.theme.dark"
                  class="d-inline-block"
                  hide-details
                  :ripple="false" />
              </span>
            </template>
            {{ calculateThemeMode }}
          </v-tooltip>
        </span>
      </div>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer" />
    </v-app-bar>

    <home-drawer v-model="drawer" />

    <v-main>
      <transition
        mode="out-in"
        name="fade">
        <v-container>
          <nuxt />
        </v-container>
      </transition>
    </v-main>

    <v-footer
      app
      class="custom flex-column"
      padless
      tile>
      <span
        class="subtitle-2 grey--text text--darken-3">&copy; {{ new Date().getFullYear() }} Gear Closet</span>
    </v-footer>

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
        <icon
          fill="white"
          height="40px"
          name="angle-up"
          width="40px" />
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
  import Icon from '~/components/icons/Icon';
  export default {
    name: 'Default',

    data: () => ({
      drawer: null,
      items: [
        { title: 'Portfolio', to: '/portfolio', badge: false, hasMenu: false },
        { title: 'About', to: '/about', badge: false, hasMenu: true, menuItems: [{ title: 'Gear', to: '/gear' }, { title: 'Blog', to: '/blog' }] },
        { title: 'Contact', to: '/contact', badge: false, hasMenu: false }
      ],
      offsetTop: 0
    }),

    computed: {
      showScrollBtn () {
        return this.offsetTop > 60;
      }
    },

    methods: {
      onScroll () {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      },
      scrollToTop () {
        this.$vuetify.goTo('#app', { duration: 500, offset: 0 });
      }
    },

    components: {
      HomeDrawer: () => import('~/components/Drawer'),
      Icon
    }
  };
</script>

<style lang="scss" scoped>
  @import '~/css/breakpoints';

  main.v-main {
    padding: 50px 0 !important;

    @include breakpoint(desktop) {
      padding: 100px 0 !important;
    }
  }

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
  @import '~/css/breakpoints.scss';

  .social { // can't be scoped
    &:hover {
      svg {
        fill: white;
      }
    }
  }

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
