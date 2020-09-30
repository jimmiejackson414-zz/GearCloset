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
      <v-list-item
        v-for="item in items"
        :key="item.title"
        color="primary"
        :exact="item.title === 'Home'"
        :to="item.to">
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
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
        { title: 'Portfolio', to: '/portfolio', badge: false },
        { title: 'Gear', to: '/gear', badge: false },
        { title: 'Blog', to: '/blog', badge: false },
        { title: 'About', to: '/about', badge: false },
        { title: 'Contact', to: '/contact', badge: false }
      ]
    })
  };
</script>

<style lang="scss">
  .v-list-item__title {
    overflow: initial !important;
  }

</style>
