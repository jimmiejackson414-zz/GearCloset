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
  import CustomIcon from '~/components/icons/CustomIcon.vue';

  export default {
    methods: {
      handleClick () {
        this.$emit('handle-click');
      }
    },

    components: {
      CustomIcon
    }
  };
</script>

<style lang="scss" scoped>
  @import '~/css/global';
</style>
