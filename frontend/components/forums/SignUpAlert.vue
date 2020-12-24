<template>
  <v-alert
    v-if="showJoin"
    border="top"
    color="primaryLight"
    outlined>
    <template #prepend>
      <custom-icon
        custom-class="mr-4"
        :fill="primaryColor"
        :height="30"
        name="info-circle"
        :width="30" />
    </template>
    <p class="body-text-1 mb-0 grey8--text">
      Posting in these forums requires a membership.
      <span
        class="primary--text font-weight-bold pointer"
        @click.stop="handleOpenUpgradeForm">
        &nbsp;Sign up today
      </span>
      &nbsp;to enjoy all the benefits of joining Gear Closet!
    </p>
  </v-alert>
</template>

<script>
  import currentUser from '~/mixins/currentUser';

  export default {
    mixins: [currentUser],

    data: () => ({
      primaryColor: ''
    }),

    computed: {
      showJoin () {
        return this.currentUser && this.currentUser.subscription_level === 'free';
      }
    },

    methods: {
      handleOpenUpgradeForm () {
        this.$emit('handle-open-upgrade-form');
      }
    },

    created () {
      this.primaryColor = this.$nuxt.$vuetify.theme.themes.light.primary;
    },

    components: {
      CustomIcon: () => import(/* webpackPrefetch: true */ '~/components/icons/CustomIcon.vue')
    }
  };
</script>

<style lang="scss" scoped>

</style>
