<template>
  <div class="onboarding-styles">
    <v-container>
      <v-row>
        <v-col class="col-12 col-md-10 offset-md-1">
          <v-stepper v-model="currentStep">
            <v-stepper-header>
              <!-- Step 1 -->
              <v-stepper-step
                :complete="currentStep > 1"
                step="1">
                Avatar
              </v-stepper-step>
              <v-divider />

              <!-- Step 2 -->
              <v-stepper-step
                :complete="currentStep > 2"
                step="2">
                Details
              </v-stepper-step>
              <v-divider />

              <!-- Step 3 -->
              <v-stepper-step step="3">
                Plans
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <step-one @handle-change-step="handleChangeStep" />
              </v-stepper-content>

              <v-stepper-content step="2">
                <step-two @handle-change-step="handleChangeStep" />
              </v-stepper-content>

              <v-stepper-content step="3">
                <step-three @handle-change-step="handleChangeStep" />
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Onboarding',

    data: () => ({
      currentStep: 1
    }),

    methods: {
      handleChangeStep (step) {
        this.currentStep = step;
      }
    },

    components: {
      StepOne: () => import(/* webpackPrefetch: true */ '~/components/onboarding/StepOne.vue'),
      StepTwo: () => import(/* webpackPrefetch: true */ '~/components/onboarding/StepTwo.vue'),
      StepThree: () => import(/* webpackPrefetch: true */ '~/components/onboarding/StepThree.vue')
    }
  };
</script>

<style lang="scss" scoped>
  .onboarding-styles {
    margin-top: 4rem;

    .v-stepper {
      box-shadow: none;

      &__header {
        box-shadow: none;
      }
    }
  }
</style>
