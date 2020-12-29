<template>
  <v-navigation-drawer
    v-bind="$attrs"
    app
    bottom
    color="transparent"
    fixed
    height="auto"
    overlay-color="black"
    overlay-opacity=".4"
    temporary
    v-on="$listeners">
    <v-list
      color="white"
      shaped>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        color="primary"
        :exact="item.title === 'Home'"
        :to="item.to">
        <v-list-item-content>
          <v-list-item-title>
            <client-only>
              <unicon
                class="mr-4"
                :fill="fillColor(item)"
                height="20"
                :name="item.icon"
                width="20" />
            </client-only>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'HomeDrawer',

    data: () => ({
      query: '',
      items: [
        { title: 'Dashboard', to: '/dashboard', badge: false, hasMenu: false, icon: 'chart-pie-alt' },
        { title: 'Explore', to: '/explore', badge: false, hasMenu: false, icon: 'globe' },
        { title: 'Forum', to: '/forum', badge: false, hasMenu: false, icon: 'comment-alt-dots' },
        { title: 'Planning', to: '/planning', badge: false, hasMenu: false, icon: 'clipboard-alt' },
        { title: 'Closet', to: '/closet', badge: false, hasMenu: false, icon: 'home-alt' }
      ]
    }),

    methods: {
      fillColor (item) {
        if (this.$route.name === item.title.toLowerCase()) {
          return this.$nuxt.$vuetify.theme.themes.light.primary;
        }
        return this.$nuxt.$vuetify.theme.themes.light['dark-grey'];
      }
    }
  };
</script>

<style lang="scss">
  .v-list-item__title {
    align-items: center;
    display: flex;
    overflow: initial !important;
  }

</style>
