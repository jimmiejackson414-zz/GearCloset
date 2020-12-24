<template>
  <div class="loading-page-wrapper">
    <loading-logo :height="400" />
  </div>
</template>

<script>
  export default {
    components: {
      LoadingLogo: () => import(/* webpackPrefetch: true */ '~/components/icons/LoadingLogo.vue')
    }
  };
</script>

<style lang="scss" scoped>
  .loading-page-wrapper {
    img {
      max-height: 400px;
    }
  }
</style>
