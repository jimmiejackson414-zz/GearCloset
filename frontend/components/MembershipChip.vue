<template>
  <!-- Member Chip -->
  <v-chip
    v-if="isMember"
    class="ma-2"
    color="success"
    :ripple="false"
    text-color="white">
    <custom-icon
      custom-class="mr-2"
      fill="#fff"
      height="20px"
      name="favorite"
      width="20px" />
    Member
  </v-chip>

  <!-- Free Chip -->
  <v-chip
    v-else
    class="ma-2"
    color="secondary"
    outlined
    text-color="secondary">
    <custom-icon
      :fill="fillColor"
      height="20px"
      name="favorite"
      width="20px" />
    Free
  </v-chip>
</template>

<script>
  import CustomIcon from '~/components/icons/CustomIcon';

  export default {
    props: {
      user: {
        type: Object,
        default: () => {},
        required: true
      }
    },

    computed: {
      chipCopy () {
        return this.isMember ? 'Member' : 'Free';
      },
      chipOutline () {
        return !this.isMember;
      },
      fillColor () {
        return this.isMember ? '#fff' : this.$nuxt.$vuetify.theme.themes.light.secondary;
      },
      isMember () {
        return this.user.subscription_level === 'annual member' || this.user.subscription_level === 'monthly member';
      }
    },

    components: {
      CustomIcon
    }
  };
</script>

<style lang="scss" scoped>

</style>
