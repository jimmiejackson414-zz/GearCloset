<template>
  <div>
    <h1>Step One</h1>
    <v-btn
      color="primary"
      @click="handleNextStep">
      Continue
    </v-btn>
  </div>
</template>

<script>
  export default {
    methods: {
      handleNextStep () {
        this.$emit('handle-next-step', 2);
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
