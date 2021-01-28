<template>
  <v-app light>
    <v-app-bar
      absolute
      app
      flat>
      <v-toolbar-title>
        <logo :color="logoColor" />
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container class="h-100">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
      class="custom flex-column"
      padless
      tile>
      <span
        class="subtitle-2 text-dark-grey">&copy; {{ new Date().getFullYear() }} Gear Closet</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Logo from '~/components/icons/Logo.vue';

  export default {
    name: 'Public',

    data: () => ({
      logoColor: '#4a4a4a'
    }),

    components: {
      Logo
    }
  };
</script>

<style lang="scss" scoped>
  footer.v-footer.custom {
    background-color: transparent;
    color: white;
    display: flex;
    justify-content: center;
    padding: 1rem;
    position: relative;
  }
</style>
