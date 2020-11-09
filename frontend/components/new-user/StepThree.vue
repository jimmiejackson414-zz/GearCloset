<template>
  <div>
    <h1>Step Three</h1>
    <v-btn
      color="primary"
      @click="completeOnboarding">
      Finish
    </v-btn>
  </div>
</template>

<script>
  export default {
    methods: {
      completeOnboarding () {
        this.$emit('complete-onboarding');
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
