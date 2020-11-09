<template>
  <div class="new-user-styles">
    <v-container>
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
            <step-one @handle-next-step="handleNextStep" />
          </v-stepper-content>

          <v-stepper-content step="2">
            <step-two @handle-next-step="handleNextStep" />
          </v-stepper-content>

          <v-stepper-content step="3">
            <step-three @complete-onboarding="completeOnboarding" />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </div>
</template>

<script>
  import StepOne from '~/components/new-user/StepOne.vue';
  import StepTwo from '~/components/new-user/StepTwo.vue';
  import StepThree from '~/components/new-user/StepThree.vue';

  export default {
    name: 'NewUser',

    data: () => ({
      currentStep: 1
    }),

    methods: {
      completeOnboarding () {
        // each step sends its own mutations to update user
        // on completion, send mutation here that sets "is_setup" to 1 in database
      },
      handleNextStep (step) {
        this.currentStep = step;
      }
    },

    components: {
      StepOne,
      StepTwo,
      StepThree
    }
  };
</script>

<style lang="scss" scoped>
  .new-user-styles {
    margin-top: 4rem;
  }
</style>
