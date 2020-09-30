<template>
  <v-form
    ref="subscriptionSettingsForm"
    v-model="valid">
    <v-container class="pt-0">
      <v-row class="justify-center align-center">
        <div class="text-h6 font-weight-light">
          Current Subscription: <span class="font-weight-bold">{{ subscriptionLevel }}</span>
        </div>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: false
    }),

    computed: {
      subscriptionLevel () {
        return 'Free';
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
