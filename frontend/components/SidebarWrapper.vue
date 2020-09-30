<template>
  <div class="sidebar-wrapper-styles">
    <slot />
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  @import '~/css/global';

  .sidebar-wrapper-styles {
    display   : inline-block;
    width     : 100%;
    max-width : 300px;
    height    : 100%;
    background: $primary;
    overflow-y: auto;
    padding   : 2rem;
    z-index   : 2;

    h3,
    p,
    label,
    span {
      color: #fff !important;
    }

    p,
    label,
    span {
      font-size: 14px;
    }
  }
</style>
