<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar flat>
        <v-btn
          icon
          @click="show = false">
          <unicon
            fill="#4a4a4a"
            :height="30"
            name="multiply"
            :width="30" />
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <h6 class="font-weight-bold text-h6 text-center">
            {{ user | prettyName }}
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
              :user="user"
              @handle-modal-open="handleModalOpen" />
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import dayjs from 'dayjs';
  import { capitalize } from '~/helpers/functions';
  import UpgradeCard from '~/components/UpgradeCard.vue';

  export default {
    props: {
      user: {
        type: Object,
        default: () => {}
      },
      value: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      cards: [
        { free: ['Create only one pack list.', 'Plan only one trip.'] },
        { member: ['Create unlimited pack lists.', 'Collaborate on trips with your friends.', 'Access to the forums.'] }
      ]
    }),

    computed: {
      joinDate () {
        return dayjs().format('MMM YYYY');
      },
      show: {
        get () {
          return this.value;
        },
        set (value) {
          this.$emit('input', value);
        }
      },
      subscriptionLevel () {
        return capitalize(this.user.subscription_level);
      }
    },

    methods: {
      handleModalOpen () {
        this.$emit('handle-modal-open');
      }
    },

    components: {
      UpgradeCard
    }
  };
</script>

<style lang="scss" scoped>

</style>
