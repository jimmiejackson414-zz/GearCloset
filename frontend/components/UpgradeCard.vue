<template>
  <v-col
    class="col-12 col-md-6 d-flex flex-column">
    <v-card
      :class="[`${Object.keys(card)[0]}-card`, 'flex', 'd-flex', 'flex-column']"
      outlined>
      <v-card-title class="pb-0">
        <h4 class="text-h4 card-title">
          {{ formatTitle(card) }}
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
                :height="24"
                name="check"
                :width="24" />
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
            v-if="shouldShow(card, 'member', 'annual')"
            class="overline text-center">
            Upgrade Options:
          </div>
          <div
            v-if="Object.keys(card)[0] === 'member' && user.subscription_level.toLowerCase() === 'annual'"
            class="overline text-center">
            Downgrade Option:
          </div>

          <!-- Upgrade/Downgrade Buttons -->
          <v-btn
            v-if="Object.keys(card)[0] === user.subscription_level.toLowerCase()"
            color="info"
            depressed
            disabled
            :ripple="false">
            Current Plan
          </v-btn>
          <v-btn
            v-if="shouldShow(card, 'free', 'free')"
            color="accent"
            depressed
            :ripple="false"
            @click="handleModalOpen">
            Free
          </v-btn>
          <v-btn
            v-if="shouldShow(card, 'member', 'monthly')"
            color="primary"
            depressed
            :ripple="false"
            @click="handleModalOpen">
            Monthly ($0.99/mo)
          </v-btn>
          <v-btn
            v-if="shouldShow(card, 'member', 'annual')"
            class="white--text"
            color="tertiaryLightest"
            depressed
            :ripple="false"
            @click="handleModalOpen">
            Annual ($9.99/yr)
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
  import { capitalize } from '~/helpers/functions';

  export default {
    props: {
      card: {
        type: Object,
        default: () => {}
      },
      user: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      primaryColor: ''

    }),

    methods: {
      formatTitle (card) {
        return capitalize(Object.keys(card)[0]);
      },
      handleModalOpen () {
        this.$emit('handle-modal-open');
      },
      shouldShow (card, itemName, subscriptionLevel) {
        return Object.keys(card)[0] === itemName && this.user.subscription_level.toLowerCase() !== subscriptionLevel;
      }
    },

    mounted () {
      this.primaryColor = $nuxt.$vuetify.theme.themes.light.primary;
    },

    components: {
      CustomIcon: () => import(/* webpackPrefetch: true */ '~/components/icons/CustomIcon.vue')
    }
  };
</script>

<style lang="scss" scoped>

</style>
