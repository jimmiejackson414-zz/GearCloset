<template>
  <ApolloQuery
    :query="require('~/apollo/queries/user/me.gql')"
    @result="handleData">
    <template v-slot="{ result: { data, error, loading}, isLoading}">
      <div
        v-if="!isLoading"
        v-resize="onResize"
        class="page-wrapper mt-10">
        <div class="container text-left">
          <div class="page-title text-h4">
            Profile
          </div>

          <!-- Custom Mobile Tabs -->
          <div
            v-if="isMobile"
            class="mobile-tabs">
            <v-select
              class="px-8 mb-4"
              dense
              hide-details
              item-text="title"
              item-value="value"
              :items="tabs"
              label="Settings"
              outlined
              value="user"
              @change="handleTabSwitch($event)" />

            <!-- Account Settings -->
            <slide-fade-transition>
              <div
                v-if="mobileTab === 'account'"
                key="1"
                class="user-settings">
                <v-card flat>
                  <v-card-text>
                    <account-settings :current-user="currentUser" />
                  </v-card-text>
                </v-card>
              </div>

              <!-- Subscription Settings -->
              <div
                v-if="mobileTab === 'subscription'"
                key="2"
                class="user-settings">
                <v-card flat>
                  <v-card-text>
                    <subscription-settings :current-user="currentUser" />
                  </v-card-text>
                </v-card>
              </div>

              <!-- User Settings -->
              <div
                v-if="mobileTab === 'user'"
                key="3"
                class="user-settings">
                <v-card flat>
                  <v-card-text class="py-0">
                    <user-settings :current-user="currentUser" />
                  </v-card-text>
                </v-card>
              </div>
            </slide-fade-transition>
          </div>

          <!-- Desktop Tabs -->
          <v-tabs
            v-else
            class="mt-4"
            :vertical="!isMobile">
            <v-tab
              v-for="(tab, i) in tabs"
              :key="i"
              class="justify-start">
              <custom-icon
                class="mr-3"
                :color="iconColor"
                :height="25"
                :name="tab.icon"
                :width="25" />
              {{ tab.title }}
            </v-tab>

            <!-- User Settings -->
            <!-- TODO: Set transitions to false temporarily until fade transition works better -->
            <v-tab-item
              :reverse-transition="false"
              :transition="false">
              <v-card flat>
                <v-card-text class="py-0">
                  <user-settings :current-user="currentUser" />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Account Settings -->
            <v-tab-item
              :reverse-transition="false"
              :transition="false">
              <v-card flat>
                <v-card-text>
                  <account-settings :current-user="currentUser" />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Subscription Settings -->
            <v-tab-item
              :reverse-transition="false"
              :transition="false">
              <v-card flat>
                <v-card-text>
                  <subscription-settings :current-user="currentUser" />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </div>
      </div>

      <loading-page v-else />
    </template>
  </ApolloQuery>
</template>

<script>
  import isMobile from '~/mixins/isMobile';

  export default {
    name: 'Profile',

    mixins: [isMobile],

    middleware: 'authenticated',

    data () {
      return {
        confirm_password: '',
        currentUser: null,
        iconColor: '',
        submitting: false,
        mobileTab: 'user',
        tabs: [
          { title: 'User Settings', icon: 'user-circle', value: 'user' },
          { title: 'Account Settings', icon: 'setting', value: 'account' },
          { title: 'Subscription', icon: 'file-landscape-alt', value: 'subscription' }
        ]
      };
    },

    methods: {
      handleData ({ data: { currentUser } }) {
        this.currentUser = currentUser;
      },
      handleTabSwitch (e) {
        this.mobileTab = e;
      }
    },

    mounted () {
      this.iconColor = $nuxt.$vuetify.theme.themes.light['dark-grey'];
    },

    components: {
      AccountSettings: () => import(/* webpackPrefetch: true */ '~/components/profile/forms/AccountSettings.vue'),
      CustomIcon: () => import(/* webpackPrefetch: true */ '~/components/icons/CustomIcon.vue'),
      SlideFadeTransition: () => import(/* webpackPrefetch: true */ '~/components/transitions/SlideFadeTransition.vue'),
      SubscriptionSettings: () => import(/* webpackPrefetch: true */ '~/components/profile/forms/SubscriptionSettings.vue'),
      UserSettings: () => import(/* webpackPrefetch: true */ '~/components/profile/forms/UserSettings.vue')
    },

    head () {
      return {
        title: 'Profile'
      };
    }
  };
</script>

<style lang="scss" scoped>
  .page-title {
    margin-bottom: 1rem;
    text-align: center;

    @include breakpoint(laptop) {
      margin-bottom: 0;
      text-align: left;
    }
  }
</style>
