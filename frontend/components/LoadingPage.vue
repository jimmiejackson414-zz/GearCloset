<template>
  <div class="loading-page-wrapper">
    <loading-logo :height="400" />
  </div>
</template>

<script>
  import LoadingLogo from '~/components/icons/LoadingLogo.vue';

  export default {
    components: {
      LoadingLogo
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
