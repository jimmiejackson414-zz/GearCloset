<template>
  <v-dialog
    v-model="show"
    max-width="750"
    :persistent="submitting">
    <v-card>
      <v-card-title>Report Post to Forum Moderator</v-card-title>
      <v-card-text>
        <div class="text-body-1">
          Report post.
        </div>
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn
          class="grey6--text"
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
          @click="handleSubmitReport">
          <loading
            v-if="submitting"
            color="#fff"
            height="30px"
            width="30px" />
          <span v-else>Submit</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex';
  import Loading from '~/components/Loading.vue';

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
      handleSubmitReport () {
        this.submitting = true;

        setTimeout(() => {
          this.closeModal();
          this.submitting = false;
          this.success('Post successfully reported.');
        }, 2000);
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
