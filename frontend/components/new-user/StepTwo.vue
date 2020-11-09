<template>
  <div>
    <h1>Step Two</h1>
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
        this.$emit('handle-next-step', 3);
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
