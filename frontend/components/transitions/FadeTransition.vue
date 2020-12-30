<template>
  <transition
    appear
    mode="out-in"
    name="fade">
    <slot />
  </transition>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    opacity: 1;
    transition: all 0.5s $cubicBezier;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
