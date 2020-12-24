<template>
  <v-btn
    class="plus-button"
    color="primary"
    elevation="2"
    fab
    :ripple="false"
    x-small
    @click="handleClick">
    <custom-icon
      fill="#ffffff"
      :height="16"
      name="plus"
      :width="16" />
  </v-btn>
</template>

<script>
  export default {
    methods: {
      handleClick () {
        this.$emit('handle-click');
      }
    },

    components: {
      CustomIcon: () => import(/* webpackPrefetch: true */ '~/components/icons/CustomIcon.vue')

    }
  };
</script>

<style lang="scss" scoped>
  @import '~/css/global';
</style>
