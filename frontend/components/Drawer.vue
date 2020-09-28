<template>
  <v-navigation-drawer
    v-bind="$attrs"
    app
    bottom
    color="transparent"
    fixed
    height="auto"
    overlay-color="black"
    overlay-opacity=".1"
    temporary
    v-on="$listeners">
    <v-list
      color="white"
      shaped>
      <v-list-item>
        <v-text-field
          v-model="query"
          class="mb-3"
          clearable
          color="primary"
          dense
          hide-details
          label="Search"
          outlined
          @keypress.enter="performSearch">
          <template v-slot:prepend>
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
      </v-list-item>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        color="primary"
        :exact="item.title === 'Home'"
        :to="item.to">
        <v-list-item-content>
          <v-list-item-title
            v-if="item.badge"
            class="reset-overflow">
            <v-badge
              class="inline-badge"
              color="red"
              :content="cartItems"
              overlap
              :value="cartItems">
              {{ item.title }}
            </v-badge>
          </v-list-item-title>
          <v-list-item-title
            v-else
            v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'HomeDrawer',

    props: {
      cartItems: {
        type: Number,
        default: 0
      }
    },

    data: () => ({
      query: '',
      items: [
        { title: 'Portfolio', to: '/portfolio', badge: false },
        { title: 'Gear', to: '/gear', badge: false },
        { title: 'Blog', to: '/blog', badge: false },
        { title: 'About', to: '/about', badge: false },
        { title: 'Contact', to: '/contact', badge: false },
        { title: 'Cart', to: '/cart', badge: true }
      ]
    }),

    methods: {
      ...mapActions('search', ['setQuery']),
      performSearch () {
        this.setQuery(this.query);

        // have to refresh page if user is already on search page
        if (this.$router.currentRoute.name === 'search') {
          this.$router.go();
        } else {
          this.$router.push({ name: 'search' });
        }
      }
    }
  };
</script>

<style lang="scss">
  .v-list-item__title {
    overflow: initial !important;

    > .v-badge.inline-badge {
      margin-top: 0;

      .v-badge__badge {
        bottom: calc(100% - 15px) !important;
        left: calc(100% + 1rem) !important;
      }
    }
  }

</style>
