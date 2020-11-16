<template>
  <v-avatar
    color="primary"
    :size="size">
    <img
      v-if="hasAvatar"
      alt="Avatar"
      :src="user.avatar_url">
    <span
      v-else
      class="white--text text-body-1 font-weight-bold">{{ initials }}</span>
  </v-avatar>
</template>

<script>
  export default {
    props: {
      size: {
        default: 56,
        type: Number
      },
      user: {
        type: Object,
        default: () => {}
      }
    },

    computed: {
      hasAvatar () {
        return !!this.user?.avatar_url;
      },
      initials () {
        return this.$options.filters.initials(this.user);
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
