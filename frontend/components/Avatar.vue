<template>
  <v-avatar
    color="primary"
    :size="size">
    <span class="white--text headline font-weight-bold">{{ initials }}</span>
  </v-avatar>
</template>

<script>
  export default {
    props: {
      initials: {
        default: 'JJ',
        type: String
      },
      size: {
        default: 56,
        type: Number
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
