<template>
  <v-container class="pt-0 subscription-container">
    <h6 class="font-weight-bold text-h6 text-center">
      {{ currentUser | prettyName }}
    </h6>
    <h6 class="text-h6 font-weight-light text-center">
      Current Subscription: <span class="font-weight-medium primary--text">{{ subscriptionLevel }}</span>
    </h6>
    <h6 class="text-h6 font-weight-light text-center mb-8">
      Member since: <span class="font-weight-medium primary--text">{{ joinDate }}</span>
    </h6>
    <v-row>
      <!-- Cards -->
      <upgrade-card
        v-for="(card, index) in cards"
        :key="index"
        :card="card"
        :user="currentUser"
        @handle-modal-open="handleModalOpen" />
    </v-row>
    <update-subscription-modal v-model="modalOpen" />
  </v-container>
</template>

<script>
  import dayjs from 'dayjs';
  import UpgradeCard from '~/components/UpgradeCard.vue';

  export default {
    props: {
      currentUser: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      cards: [
        { free: ['Create only one pack list.', 'Plan only one trip.'] },
        { member: ['Create unlimited pack lists.', 'Collaborate on trips with your friends.', 'Access to the forums.'] }
      ],
      modalOpen: false
    }),

    computed: {
      joinDate () {
        return dayjs().format('MMM YYYY');
      },
      subscriptionLevel () {
        return this.currentUser.subscription_level;
      }
    },

    methods: {
      handleModalOpen () {
        this.modalOpen = true;
      }
    },

    components: {
      UpdateSubscriptionModal: () => import(/* webpackPrefetch: true */ '~/components/modals/UpdateSubscriptionModal'),
      UpgradeCard
    }
  };
</script>

<style lang="scss" scoped>
  .subscription-container {
    h6 {
      text-transform: capitalize;
    }

    .free-card, .member-card {
      .card-title {
        text-transform: capitalize;
      }
    }

    .member-card {
      border-color: $primary;
    }
  }

</style>
