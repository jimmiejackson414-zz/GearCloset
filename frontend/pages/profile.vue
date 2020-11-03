<template>
  <div
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
                <account-settings
                  :current-user="currentUser"
                  @handle-submit="handleSubmit" />
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
                <subscription-settings
                  :current-user="currentUser"
                  @handle-submit="handleSubmit" />
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
                <user-settings
                  :current-user="currentUser"
                  @handle-submit="handleSubmit" />
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
              <user-settings
                :current-user="currentUser"
                @handle-submit="handleSubmit" />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Account Settings -->
        <v-tab-item
          :reverse-transition="false"
          :transition="false">
          <v-card flat>
            <v-card-text>
              <account-settings
                :current-user="currentUser"
                @handle-submit="handleSubmit" />
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Subscription Settings -->
        <v-tab-item
          :reverse-transition="false"
          :transition="false">
          <v-card flat>
            <v-card-text>
              <subscription-settings
                :current-user="currentUser"
                @handle-submit="handleSubmit" />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
  import AccountSettings from '~/components/profile/forms/AccountSettings.vue';
  import currentUser from '~/mixins/currentUser';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import isMobile from '~/mixins/isMobile';
  import SlideFadeTransition from '~/components/transitions/SlideFadeTransition.vue';
  import SubscriptionSettings from '~/components/profile/forms/SubscriptionSettings.vue';
  import UserSettings from '~/components/profile/forms/UserSettings.vue';

  export default {
    name: 'Profile',

    mixins: [currentUser, isMobile],

    data () {
      return {
        confirm_password: '',
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
      handleSubmit () {
        this.submitting = true;
        console.log('handleSubmit');

        setTimeout(() => {
          this.submitting = false;
        }, 3000);
      },
      handleTabSwitch (e) {
        this.mobileTab = e;
      }
    },

    mounted () {
      this.iconColor = $nuxt.$vuetify.theme.themes.light['dark-grey'];
      this.onResize();
    },

    components: {
      AccountSettings,
      CustomIcon,
      SlideFadeTransition,
      SubscriptionSettings,
      UserSettings
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
