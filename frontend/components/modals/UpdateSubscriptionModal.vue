<template>
  <v-dialog
    v-model="show"
    max-width="400px"
    :persistent="submitting">
    <v-card>
      <v-card-title>
        Change Your Subscription
      </v-card-title>
      <v-card-text>
        <div class="text-body-1">
          This will change your subscription.
        </div>
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn
          class="grey7--text"
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
          @click="handleUpgrade">
          <loading
            v-if="submitting"
            color="#fff"
            height="30px"
            width="30px" />
          <span v-else>Upgrade</span>
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
      handleUpgrade () {
        this.submitting = true;

        setTimeout(() => {
          this.closeModal();
          this.submitting = false;
          this.success('Your subscription was successfully changed!');
        }, 3000);
      }
    },

    components: {
      Loading
    }
  };
</script>

<style lang="scss" scoped>
  .v-card {
    border-top: 5px solid $primary;
  }
</style>
