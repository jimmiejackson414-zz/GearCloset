<template>
  <v-dialog
    v-model="show"
    class="test"
    max-width="750"
    :persistent="submitting">
    <v-card>
      <v-card-title>{{ formatAction }} Detail</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="details.title"
                color="primary"
                dense
                :disabled="submitting"
                hide-details
                label="Title"
                outlined
                placeholder="Elevation Gain"
                required />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="details.value"
                color="primary"
                dense
                :disabled="submitting"
                hide-details
                label="Value"
                outlined
                placeholder="5400 ft."
                required />
            </v-col>
            <v-col cols="12">
              <v-checkbox
                v-model="hasUrl"
                class="mt-0"
                color="primary"
                hide-details
                label="Link to external URL?"
                :ripple="false" />
            </v-col>
            <v-col
              v-if="hasUrl"
              cols="12">
              <v-text-field
                v-model="details.url"
                color="primary"
                dense
                :disabled="submitting"
                hide-details
                label="URL"
                outlined
                placeholder="https://www.southwest.com"
                required />
            </v-col>
          </v-row>
        </v-container>
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
      details () {
        if (this.detail) {
          return { ...this.detail };
        }
        return { title: '', url: '', value: '' };
      },
      hasUrl () {
        // TODO: works initially, but if user unchecks, should hide url text field
        return !!this.detail?.url;
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
        }, 2000);
      },
      handleUpdate () {
        console.log('handleUpdate');
        this.submitting = true;

        setTimeout(() => {
          this.closeModal();
          this.submitting = false;
          this.$emit('handle-reset-modal');
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
