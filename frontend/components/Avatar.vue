<template>
  <client-only>
    <v-avatar
      :color="hasAvatar ? '' : 'primary'"
      :size="size">
      <cld-image
        v-if="hasAvatar"
        class="d-flex"
        crop="fill"
        fetch-format="auto"
        gravity="auto:subject"
        :height="size"
        :public-id="user.avatar_url"
        quality="auto"
        radius="max"
        :width="size" />
      <span
        v-else
        class="white--text text-body-1 font-weight-bold">{{ initials }}</span>
    </v-avatar>
  </client-only>
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
