<template>
  <div>
    <h4 class="text-h4 font-weight-bold step-title">
      Explore Our Plans
    </h4>
    <v-alert
      v-if="isError"
      border="top"
      color="error"
      outlined>
      <template #prepend>
        <custom-icon
          custom-class="mr-4"
          :fill="errorColor"
          :height="30"
          name="exclamation-triangle"
          :width="30" />
      </template>
      <p class="body-text-1 mb-0 error--text">
        There was an error finishing onboarding. Please try again or <a href="mailto:contact@gearcloset.io">contact</a> customer care.
      </p>
    </v-alert>
    <div class="plans-wrapper">
      <v-row>
        <!-- Cards -->
        <upgrade-card
          v-for="(card, index) in cards"
          :key="index"
          :card="card"
          :user="currentUser"
          @handle-modal-open="handleModalOpen" />
      </v-row>
    </div>
    <div class="btn-wrapper">
      <v-btn
        class="grey7--text"
        :ripple="false"
        text
        @click="handlePrevStep">
        Previous
      </v-btn>
      <v-btn
        color="primary"
        :disabled="submitting"
        @click="completeOnboarding">
        <loading
          v-if="submitting"
          color="#fff"
          height="30px"
          width="30px" />
        <span v-else>Finish</span>
      </v-btn>
    </div>

    <update-subscription-modal v-model="modalOpen" />
  </div>
</template>

<script>
  import currentUser from '~/mixins/currentUser';
  import updateMutation from '~/apollo/mutations/auth/update.gql';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import Loading from '~/components/Loading.vue';
  import UpgradeCard from '~/components/UpgradeCard.vue';

  export default {
    mixins: [currentUser],

    data: () => ({
      cards: [
        { free: ['Create only one pack list.', 'Plan only one trip.'] },
        { member: ['Create unlimited pack lists.', 'Collaborate on trips with your friends.', 'Access to the forums.'] }
      ],
      errorColor: '',
      isError: false,
      modalOpen: false,
      submitting: false
    }),

    methods: {
      async completeOnboarding () {
        this.submitting = true;

        try {
          const payload = { has_onboarded: true, id: Number(this.currentUser.id) };
          const { errors } = await this.$apollo.mutate({
            mutation: updateMutation,
            variables: payload
          });

          if (errors?.length) {
            this.isError = true;
            this.submitting = false;
            return;
          }

          this.$router.push('/closet');
          this.submitting = false;
        } catch (e) {
          this.isError = true;
          this.submitting = false;
        }
      },
      handleModalOpen () {
        this.modalOpen = true;
      },
      handlePrevStep () {
        this.$emit('handle-change-step', 2);
      }
    },

    mounted () {
      this.errorColor = this.$nuxt.$vuetify.theme.themes.light.error;
    },

    components: {
      CustomIcon,
      Loading,
      UpdateSubscriptionModal: () => import(/* webpackPrefetch: true */ '~/components/modals/UpdateSubscriptionModal'),
      UpgradeCard
    }
  };
</script>

<style lang="scss" scoped>
  .step-title {
    margin-bottom: 16px;
    text-align: center;
  }

  .btn-wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>
