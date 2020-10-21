<template>
  <v-dialog
    v-model="show"
    max-width="750"
    :persistent="submitting">
    <v-card>
      <v-card-title>{{ formatAction }} Detail</v-card-title>
      <v-card-text>
        <div class="text-body-1">
          Create or Update a detail
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
          @click="directClick">
          <loading
            v-if="submitting"
            color="#fff"
            height="30px"
            width="30px" />
          <span v-else>{{ formatAction }}</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex';
  import { capitalize } from '~/helpers/functions';
  import Loading from '~/components/Loading.vue';

  export default {
    props: {
      detail: {
        type: Object,
        required: false,
        default: () => {}
      },
      value: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      submitting: false
    }),

    computed: {
      createOrUpdate () {
        return this.detail ? 'update' : 'create';
      },
      formatAction () {
        return capitalize(this.createOrUpdate) || '';
      },
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
        this.$emit('handle-reset-modal');
      },
      directClick () {
        return this.createOrUpdate === 'update' ? this.handleUpdate : this.handleCreate;
      },
      handleCreate () {
        console.log('handleCreate');
        this.submitting = true;

        setTimeout(() => {
          this.closeModal();
          this.submitting = false;
          this.$emit('handle-reset-modal');
          this.success('Detail successfully added.');
        }, 2000);
      },
      handleUpdate () {
        console.log('handleUpdate');
        this.submitting = true;

        setTimeout(() => {
          this.closeModal();
          this.submitting = false;
          this.$emit('handle-reset-modal');
          this.success('Detail successfully updated.');
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
