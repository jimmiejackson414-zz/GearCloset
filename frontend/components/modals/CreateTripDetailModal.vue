<template>
  <v-dialog
    v-model="show"
    class="test"
    max-width="750"
    :persistent="submitting">
    <v-card>
      <v-card-title>Create {{ formattedDetailType }} Detail</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="detail.title"
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
                v-model="detail.value"
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
                class="mt-0"
                color="primary"
                :false-value="false"
                hide-details
                label="Link to external URL?"
                :ripple="false"
                :true-value="true"
                :value="hasUrl"
                @click="handleCheckbox" />
            </v-col>
            <v-col
              v-if="hasUrl"
              cols="12">
              <v-text-field
                v-model="detail.url"
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
          @click="handleCreate">
          <loading
            v-if="submitting"
            color="#fff"
            height="30px"
            width="30px" />
          <span v-else>Create</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex';
  import { capitalize, prependProtocol } from '~/helpers/functions';
  import Loading from '~/components/Loading.vue';

  export default {
    props: {
      detailType: {
        type: String,
        default: 'trip'
      },
      trip: {
        type: Object,
        default: () => {}
      },
      value: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        detail: {
          title: '',
          url: '',
          value: '',
          type: this.detailType || 'hike'
        },
        hasUrl: false,
        submitting: false
      };
    },

    computed: {
      formattedDetailType () {
        return capitalize(this.detailType);
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
      ...mapActions('entities/tripDetails', [
        'createTripDetail'
      ]),
      closeModal () {
        this.show = false;
        this.detail = { title: '', url: '', value: '', type: '' };
        this.$emit('handle-reset-modal');
      },
      handleCheckbox () {
        this.hasUrl = !this.hasUrl;
      },
      async handleCreate () {
        this.submitting = true;

        const payload = {
          variables: {
            title: this.detail.title,
            type: this.detail.type,
            url: this.hasUrl ? prependProtocol(this.detail.url) : null,
            value: this.detail.value,
            trip: this.trip.id
          }
        };

        await this.createTripDetail(payload);

        this.submitting = false;
        this.closeModal();
      }
    },

    watch: {
      detail (val) {
        this.hasUrl = !!val.url;
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
