<template>
  <transition
    appear
    mode="out-in"
    name="slide-fade">
    <slot />
  </transition>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  @import '~/css/colors';

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 0.5s $cubic-bezier;
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(200px);
  }
</style>
