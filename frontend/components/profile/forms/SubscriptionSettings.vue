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
      <v-col
        v-for="(card, index) in cards"
        :key="index"
        class="col-12 col-md-6 d-flex flex-column">
        <v-card
          :class="[`${Object.keys(card)[0]}-card`, 'flex', 'd-flex', 'flex-column']"
          outlined>
          <v-card-title class="pb-0">
            <h4 class="text-h4 card-title">
              {{ Object.keys(card)[0] }}
            </h4>
          </v-card-title>
          <v-card-text class="flex">
            <v-list dense>
              <v-list-item
                v-for="(item, i) in card[Object.keys(card)[0]]"
                :key="i">
                <v-list-item-icon class="mr-4">
                  <custom-icon
                    :fill="primaryColor"
                    height="24px"
                    name="check"
                    width="24px" />
                </v-list-item-icon>
                <v-list-item-content>
                  <p class="text-body-1 mb-0">
                    {{ item }}
                  </p>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions class="justify-center">
            <div class="btn-wrapper text-center">
              <!-- Upgrade Title -->
              <div
                v-if="shouldShow(card, 'free', 'free')"
                class="overline text-center">
                Downgrade Option:
              </div>
              <div
                v-if="shouldShow(card, 'member', 'annual member')"
                class="overline text-center">
                Upgrade Options:
              </div>
              <div
                v-if="Object.keys(card)[0] === 'member' && currentUser.subscription_level.toLowerCase() === 'annual member'"
                class="overline text-center">
                Downgrade Option:
              </div>

              <!-- Upgrade/Downgrade Buttons -->
              <v-btn
                v-if="shouldShow(card, 'free', 'free')"
                color="accent"
                depressed
                :ripple="false"
                @click="handleModalOpen">
                Free
              </v-btn>
              <v-btn
                v-if="shouldShow(card, 'member', 'monthly member')"
                color="primary"
                depressed
                :ripple="false"
                @click="handleModalOpen">
                Monthly ($0.99/mo)
              </v-btn>
              <v-btn
                v-if="shouldShow(card, 'member', 'annual member')"
                color="success"
                depressed
                :ripple="false"
                @click="handleModalOpen">
                Annual ($9.99/yr)
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <update-subscription-modal v-model="modalOpen" />
  </v-container>
</template>

<script>
  import dayjs from 'dayjs';
  import UpdateSubscriptionModal from '~/components/modals/UpdateSubscriptionModal';

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
      primaryColor: '',
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
      },
      shouldShow (card, itemName, subscriptionLevel) {
        return Object.keys(card)[0] === itemName && this.currentUser.subscription_level.toLowerCase() !== subscriptionLevel;
      }
    },

    mounted () {
      this.primaryColor = $nuxt.$vuetify.theme.themes.light.primary;
    },

    components: {
      UpdateSubscriptionModal
    }
  };
</script>

<style lang="scss" scoped>
  @import '~/css/global';

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
