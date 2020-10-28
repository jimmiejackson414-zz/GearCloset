<template>
  <v-chip
    :class="[ ...customClass ]"
    :color="chip.color"
    :outlined="chip.outlined"
    :ripple="false">
    <custom-icon
      custom-class="mr-2"
      :fill="chip.icon"
      height="20px"
      name="favorite"
      width="20px" />
    <span class="font-weight-bold">{{ chip.copy }}</span>
  </v-chip>
</template>

<script>
  import CustomIcon from '~/components/icons/CustomIcon';

  export default {
    props: {
      customClass: {
        type: String,
        default: ''
      },
      user: {
        type: Object,
        default: () => {},
        required: true
      }
    },

    data: () => ({
      chip: {
        color: '',
        copy: '',
        icon: '',
        outlined: false,
        text: ''
      }
    }),

    computed: {
      isMember () {
        return this.user.subscription_level === 'annual' || this.user.subscription_level === 'monthly';
      }
    },

    methods: {
      handleChipDefinition () {
        const theme = this.$nuxt.$vuetify.theme.themes.light;
        if (this.isMember) {
          this.chip.color = 'success';
          this.chip.copy = 'Member';
          this.chip.text = '#fff';
          this.chip.icon = '#fff';
          this.chip.outlined = false;
        } else {
          this.chip.color = 'accentDark';
          this.chip.copy = 'Free';
          this.chip.text = theme.accentDark;
          this.chip.icon = theme.accentDark;
          this.chip.outlined = true;
        }
      }
    },

    created () {
      this.handleChipDefinition();
    },

    watch: {
      isMember (val, oldVal) {
        if (val !== oldVal) {
          this.handleChipDefinition();
        }
      }
    },

    components: {
      CustomIcon
    }
  };
</script>

<style lang="scss" scoped>

</style>
