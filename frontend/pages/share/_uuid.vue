<template>
  <div>
    <h1 class="text-h1">
      UUID: {{ uuid }}
    </h1>
  </div>
</template>

<script>
  export default {
    data: () => ({
      uuid: ''
    }),

    mounted () {
      this.uuid = this.$route.params.uuid;
    }
  };
</script>

<style lang="scss" scoped>

</style>
