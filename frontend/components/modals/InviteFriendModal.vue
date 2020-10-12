<template>
  <v-dialog
    v-model="show"
    max-width="750"
    :persistent="submitting">
    <v-card>
      <v-card-title>Invite A Friend</v-card-title>
      <v-card-text>
        <div class="text-body-1">
          Bring along an existing friend or invite a new one.
        </div>
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn
          class="light-grey--text"
          :disabled="submitting"
          :ripple="false"
          text
          @click="closeModal">
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          depressed
          :disabled="submitting"
          :ripple="false"
          @click="handleInviteFriend">
          <loading
            v-if="submitting"
            color="#fff"
            height="30px"
            width="30px" />
          <span v-else>Invite</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex';
  import Loading from '~/components/Loading';

  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      submitting: false
    }),

    computed: {
      show: {
        get () {
          return this.value;
        },
        set (value) {
          this.$emit('input', value);
        }
      }
    },

    methods: {
      ...mapActions({
        success: 'alert/success',
        error: 'alert/error'
      }),
      closeModal () {
        this.show = false;
      },
      handleInviteFriend () {
        this.submitting = true;

        setTimeout(() => {
          this.closeModal();
          this.submitting = false;
          this.success('Your friend was successfully invited.');
        }, 2000);
      }
    },

    components: {
      Loading
    }
  };
</script>

<style lang="scss" scoped>
  @import '~/css/colors';

  .v-card {
    border-top: 5px solid $primary;
  }
</style>
